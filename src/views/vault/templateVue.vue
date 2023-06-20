<template>
  <div class="m-auto p-10">
    <button class="btn">整体</button>
  </div>
</template>
<script lang="ts">
  import { commonStore } from '~/stores/modules/common';
  import { defineComponent, ref, onMounted } from 'vue';
  import { environment } from '~/utils/iostConfig';
  import { ContractService } from '~/utils/contractServe';
  import { SwapManager } from '~/utils/swapManager';
  import { FarmManager } from '~/utils/farmManager';

  export default defineComponent({
    name: 'Template2Vue',
    setup() {
      const waiting = ref(false);
      const appStore = commonStore();
      const myIOST = appStore.getMyIOST;
      const walletReady = appStore.getWalletReady;
      const account = appStore.getAccount;
      const ROUND_DOWN = ref(1);
      const XG_LIST = ref(['xg_3', 'xg_30', 'xg_90', 'xg_180']);

      onMounted(() => {
        // 2
        load();
      });
      const load = async () => {
        waiting.value = true;
        await SwapManager.constructor(myIOST);
        await FarmManager.constructor(myIOST);
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
