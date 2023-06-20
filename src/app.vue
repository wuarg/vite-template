<template>
  <router-view></router-view>
</template>
<script lang="ts">
  import { commonStore } from '~/stores/modules/common';
  import { defineComponent, ref, onMounted } from 'vue';
  import { ContractService } from '~/utils/contractServe';
  import { environment } from '~/utils/iostConfig';
  import { BankManager } from '~/utils/bankManager';
  import { SwapManager } from '~/utils/swapManager';
  export default defineComponent({
    name: '',
    setup() {
      const appStore = commonStore();
      const waiting = ref(false);
      const profile = ref<Record<string, any>>({});
      console.log('ContractService---', ContractService);
      onMounted(() => {
        // connectWith(connectors[0]);
        load();
      });
      const load = async () => {
        waiting.value = true;

        const walletReady = await ContractService.init();
        const account = ContractService.getUserAddress();
        const myIOST = ContractService.getIOST();
        console.log('walletReady---', walletReady);
        console.log('account---', account);
        console.log('myIOST---', myIOST);
        appStore.setWalletReady(walletReady);
        appStore.setAccounte(account);
        appStore.setMyIOST(myIOST);
        await BankManager.constructor(myIOST);
        await SwapManager.constructor(myIOST);

        if (walletReady && account) {
          profile.value.account = ContractService.getUserAddress();
          profile.value.allPairs = await SwapManager.allPairs();

          setInterval(() => {
            loadPrices();
          }, 60000);
          loadPrices();
          profile.value.walletReady = true;
        } else {
          profile.value.account = '';
          profile.value.allPairs = [];
          profile.value.walletReady = false;
        }

        waiting.value = false;
      };
      const loadPrices = async () => {
        profile.value.iostPrice = +(await BankManager.getOraclePrice());
        profile.value.xusdPrice = +(
          profile.value.iostPrice * +(await SwapManager.getIOSTXUSDRatio())
        ).toFixed(2);
      };
      appStore.setProfile(profile.value);
      return {
        profile,
      };
    },
    computed: {},
  });
</script>
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
