<script setup lang="ts">
  import {
    MetaMaskConnector,
    WalletConnectConnector,
    CoinbaseWalletConnector,
    SafeConnector,
    Connector,
    useEthers,
    useWallet,
  } from 'vue-dapp';
  import { ref, onBeforeMount, onMounted } from 'vue';

  const { address, balance, chainId, isActivated, dnsAlias } = useEthers();
  const { disconnect, wallet, onDisconnect, onAccountsChanged, onChainChanged } = useWallet();

  const isDev = import.meta.env.DEV;
  const infuraId = isDev ? import.meta.env.VITE_INFURA_KEY : 'ff6a249a74e048f1b413cba715f98d07';

  let connectors: Connector[] = [
    new MetaMaskConnector({
      appUrl: 'http://localhost:3000',
    }),
    new WalletConnectConnector({
      qrcode: true,
      rpc: {
        1: `https://mainnet.infura.io/v3/${infuraId}`,
        4: `https://rinkeby.infura.io/v3/${infuraId}`,
      },
    }),
    new CoinbaseWalletConnector({
      appName: 'Vue Dapp',
      jsonRpcUrl: `https://mainnet.infura.io/v3/${infuraId}`,
    }),
  ];

  const connectorsCreated = ref(false);

  onBeforeMount(async () => {
    const safe = new SafeConnector();
    console.log('safe---', safe);
    try {
      console.log('safe22---', await safe.isSafeApp());
      if (await safe.isSafeApp()) {
        connectors = [safe];
        console.log('safe33---', connectors);
      }
    } catch (err: any) {
      console.error(err);
    }

    connectorsCreated.value = true;
  });

  const autoConnectErrorHandler = (err: any) => {
    console.error(err);
  };

  const connectErrorHandler = (err: any) => {
    console.error(err);
  };

  // const web3 = window.ethereum as any;
  // const { connectWith } = useWallet();

  // function sleep(ms: number) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
  // await sleep(100);
  // if (web3.selectedAddress) {
  //   console.log('web3.selectedAddress----', web3.selectedAddress);
  //   connectWith(connectors[0]);
  // }
  // onMounted(() => {
  //   connectWith(connectors[0]);
  // });
</script>
<template>
  <router-view></router-view>
  <vd-board
    v-if="connectorsCreated"
    :connectors="connectors"
    dark
    :auto-connect-error-handler="autoConnectErrorHandler"
    :connect-error-handler="connectErrorHandler"
  />
</template>

<style lang="less">
  body {
    // @apply transition-colors;
  }
  #app {
    font-family: sans-serif;
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
