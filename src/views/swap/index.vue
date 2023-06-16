<template>
  <div class="p-10">
    swap

    {{ profile }}
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { ContractService } from '~/utils/contractServe';
  import { environment } from '~/utils/iostConfig';
  import { BankManager } from '~/utils/bankManager';
  import { SwapManager } from '~/utils/swapManager';
  export default defineComponent({
    name: '',
    setup() {
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
      return {
        profile,
      };
    },
    computed: {},
  });
</script>
<style lang="less" scoped>
  .wrap {
    height: 100vh;
  }
</style>
