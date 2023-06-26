<template>
  <div class="p-10"> NFT </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { commonStore } from '~/stores/modules/common';
  import { environment } from '~/utils/iostConfig';
  import { ContractService } from '~/utils/contractServe';
  import { nftManager } from '~/utils/nftManager';
  export default defineComponent({
    name: 'PoolVue',
    setup() {
      const waiting = ref(false);
      const appStore = commonStore();
      const myIOST = appStore.getMyIOST;
      const walletReady = appStore.getWalletReady;
      const account = appStore.getAccount;
      const nft = ref<any>(null);

      // 获取NFT信息
      const contractAddress = 'ContractBZ5HHacSeUJNF3CorAKv3izB29NcnSFvPDTQmqcECHjT';
      const tokenId = 'YOUR_NFT_TOKEN_ID';
      onMounted(() => {
        load();
      });
      const load = async () => {
        waiting.value = true;
        await nftManager.constructor(myIOST);
        if (walletReady && account) {
          try {
            // 发起第一个异步请求
            const nftInfo = await nftManager.getTokenBalance(contractAddress);
            console.log('nftInfo---', nftInfo);
            // 设置NFT信息
            nft.value = {
              name: nftInfo.name,
              owner: nftInfo.owner,
            };
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
