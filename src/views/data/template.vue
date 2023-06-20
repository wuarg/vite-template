<template>
  <div class="m-auto p-10">
    <button class="btn">整体</button>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { environment } from '~/utils/iostConfig';
  import { ContractService } from '~/utils/contractServe';
  import { BurnerManager } from '~/utils/burnerManager';
  import { SwapManager } from '~/utils/swapManager';
  import { TokenManager } from '~/utils/tokenManager';

  export default defineComponent({
    name: 'Template2Vue',
    setup() {
      const waiting = ref(false);
      onMounted(() => {
        // 2
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
        await BurnerManager.constructor(myIOST);
        await SwapManager.constructor(myIOST);
        await TokenManager.constructor(myIOST);
        if (walletReady && account) {
          try {
            // 发起第一个异步请求
            // 发起第二个异步请求
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log('未连接钱包');
        }
      };
      return {};
    },
    computed: {},
  });
</script>
<style lang="less" scoped>
  .wrap {
    height: 100vh;
  }
</style>
