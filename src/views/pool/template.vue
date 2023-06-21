<template>
  <div class="p-10"> 做市 </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { commonStore } from '~/stores/modules/common';
  import { environment } from '~/utils/iostConfig';
  import { ContractService } from '~/utils/contractServe';
  import { SwapManager } from '~/utils/swapManager';
  export default defineComponent({
    name: 'PoolVue',
    setup() {
      const waiting = ref(false);
      const appStore = commonStore();
      const myIOST = appStore.getMyIOST;
      const walletReady = appStore.getWalletReady;
      const account = appStore.getAccount;
      onMounted(() => {
        load();
      });
      const load = async () => {
        waiting.value = true;
        await SwapManager.constructor(myIOST);
        if (walletReady && account) {
          try {
            // 发起第一个异步请求
          } catch (error) {
            console.error(error);
          }
          waiting.value = false;
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
