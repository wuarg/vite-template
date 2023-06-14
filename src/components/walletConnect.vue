<script setup lang="ts">
  import { onBeforeMount, ref, watch } from 'vue';
  // import Dropdown from './Dropdown.vue';
  import {
    useBoard,
    useEthers,
    useWallet,
    useEthersHooks,
    displayEther,
    shortenAddress,
    displayChainName,
  } from 'vue-dapp';

  const { open } = useBoard();
  const { address, balance, chainId, isActivated, dnsAlias } = useEthers();
  const { disconnect, wallet, onDisconnect, onAccountsChanged, onChainChanged } = useWallet();
  const { onActivated, onChanged } = useEthersHooks();

  onDisconnect(() => {
    console.log('disconnect');
  });

  onAccountsChanged(() => {
    console.log('accounts changed2');
  });

  onChainChanged((chainId: any) => {
    console.log('chain changed', chainId);
  });

  const { availableNetworks } = useEthers();

  const supportedChainId = Object.keys(availableNetworks.value).map((key) => Number(key));

  const selectedChainId = ref(0);

  onActivated(() => {
    selectedChainId.value = chainId.value as number;
  });

  const isChainChanged = ref(false);
  onChanged(() => {
    selectedChainId.value = chainId.value as number;
    isChainChanged.value = true;
  });

  // For turning back to previous chainId without calling switchChain() again
  const switchError = ref(false);
  watch(selectedChainId, async (val, oldVal) => {
    console.log('val, oldVal', val, oldVal);
    if (oldVal === 0) return; // ignore initial change
    if (switchError.value) {
      switchError.value = false;
      return;
    }

    try {
      if (wallet.connector) {
        await wallet.connector.switchChain!(val);
      }
    } catch (e: any) {
      switchError.value = true;
      selectedChainId.value = oldVal;
      console.error(e);
    }
  });
</script>

<template>
  <div v-if="isActivated" class="inline-block">
    <!-- chainId -->
    <!-- {{ chainId }} -->
    <!-- Account -->
    <div class="inline-block rounded-2xl bg-gray-100 py-2 px-3 sm:hidden">
      {{ shortenAddress(address) }}
    </div>

    <div class="hidden items-center rounded-3xl border border-solid py-1 px-2 sm:flex">
      <div class="mr-1 px-1">{{ displayEther(balance) }} ETH</div>
      <div class="inline-block rounded-2xl bg-gray-100 py-2 px-3">
        {{ shortenAddress(address) }}
      </div>
    </div>
    <!-- Network -->
    <!-- <Dropdown
                v-model:selected="selectedChainId"
                class="mt-2"
                :options="supportedChainId"
                :filter-fn="displayChainName"
              ></Dropdown> -->
    <!-- <div>
      <button class="rounded-3xl border px-2 text-sm" @click="disconnect">Disconnect</button>
    </div> -->
  </div>
  <button v-else class="btn" :disabled="wallet.status === 'connecting'" @click="open()">
    {{
      wallet.status === 'connecting'
        ? 'Connecting...'
        : wallet.status === 'loading'
        ? 'Loading...'
        : 'Connect'
    }}
  </button>
</template>

<style scoped lang="less"></style>
