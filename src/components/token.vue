<script lang="ts">
  import { defineComponent } from 'vue';
  import { useEthers, useEthersHooks } from 'vue-dapp';
  import { useToken } from '~/composables/useToken';

  export default defineComponent({
    name: 'Token',
    setup() {
      const { address, isActivated } = useEthers();
      const { call, name, totalSupply, decimals, symbol, balance } = useToken();
      const { onActivated, onDeactivated, onChanged } = useEthersHooks();

      onActivated(({ provider, address }) => {
        console.log('provider, address---', provider, address);
        call(
          provider,
          import.meta.env.VITE_ERC_ADDRESS || '0xe0f0A02b8707E26E3ECd6F0Cdb91cD169Fe6d2d2', // ARB Mainnet
          address,
        );
      });

      onDeactivated(() => {
        console.log('deactivated');
      });

      onChanged(() => {
        console.log('change');
      });

      return {
        isActivated,
        address,
        name,
        totalSupply,
        decimals,
        symbol,
        balance,
      };
    },
  });
</script>

<template>
  <div v-if="isActivated" class="text-white flex flex-col items-center justify-center">
    <p>name: {{ name }}</p>
    <p>totalSupply: {{ totalSupply }}</p>
    <p>decimals: {{ decimals }}</p>
    <p>symbol: {{ symbol }}</p>
    <p>balance: {{ balance }}</p>
  </div>
</template>
