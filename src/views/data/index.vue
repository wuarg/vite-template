<template>
  <div class="m-auto p-10">
    <button class="btn">整体</button>
    <div class="jumbotron xg-analytics-jumbotron xg-analytics-bound text-center">
      <h6 class="text-center" style="margin-top: 8px"> xg流通量: {{ xgSupply }} </h6>

      <h6 class="text-center" style="margin-top: 8px"> xg价格: ${{ xgPrice }} </h6>
    </div>

    <div class="jumbotron xg-analytics-jumbotron xg-analytics-bound text-center">
      <h6 class="text-center" style="margin-top: 8px"> xusd流通量: {{ xusdSupply }} </h6>

      <h6 class="text-center" style="margin-top: 8px"> xusd价格: ${{ xusdPrice }} </h6>
    </div>

    <div class="jumbotron xg-analytics-jumbotron xg-analytics-bound text-center">
      <h6 class="text-center" style="margin-top: 8px"> 做市中iost: {{ poolIOST }} iost </h6>
      <h6 class="text-center" style="margin-top: 8px"> 做市中vost: {{ poolVOST }} vost </h6>
      <h6 class="text-center" style="margin-top: 8px"> 做市中xusd: {{ poolXUSD }} xusd </h6>
      <h6 class="text-center" style="margin-top: 8px"> 做市中xg: {{ poolXG }} xg </h6>

      <h6 class="text-info text-center" style="margin-top: 8px"> 历史销毁xg: 44693.256890 xg </h6>
    </div>

    <div class="jumbotron xg-analytics-jumbotron xg-analytics-bound text-center">
      <h6 class="text-center" style="margin-top: 8px"> 稳定币小金库: {{ stabFund }} iost </h6>
    </div>

    <div class="jumbotron xg-analytics-jumbotron xg-analytics-bound text-center">
      <h6 class="text-center" style="margin-top: 8px"> 总锁仓(仅iost): {{ iostLocked }} iost </h6>
    </div>
  </div>
</template>
<script lang="ts">
  import { commonStore } from '~/stores/modules/common';
  import { defineComponent, ref, onMounted } from 'vue';
  import { environment } from '~/utils/iostConfig';
  import { ContractService } from '~/utils/contractServe';
  import { BurnerManager } from '~/utils/burnerManager';
  import { SwapManager } from '~/utils/swapManager';
  import { TokenManager } from '~/utils/tokenManager';

  export default defineComponent({
    name: 'TemplateVue',
    setup() {
      const appStore = commonStore();
      const waiting = ref(false);

      const xgSupply = ref(0);
      const xgPrice = ref(0);
      const xusdSupply = ref(0);
      const xusdPrice = ref(0);

      const poolIOST = ref(0);
      const poolVOST = ref(0);
      const poolXUSD = ref(0);
      const poolXG = ref(0);

      const stabFund = ref(0);
      const iostLocked = ref(0);
      const myIOST = appStore.getMyIOST;
      const walletReady = appStore.getWalletReady;
      const account = appStore.getAccount;
      onMounted(() => {
        // 2
        load();
      });
      const load = async () => {
        xusdPrice.value = appStore.getXusdPrice;
        waiting.value = true;
        // const walletReady = await ContractService.init();
        // const account = ContractService.getUserAddress();
        // const myIOST = ContractService.getIOST();
        console.log('walletReady---', walletReady, appStore.getXusdPrice);
        console.log('account---', account);
        console.log('myIOST---', myIOST);
        await BurnerManager.constructor(myIOST);
        await SwapManager.constructor(myIOST);
        await TokenManager.constructor(myIOST);
        if (walletReady && account) {
          xusdPrice.value = appStore.getXusdPrice;
          try {
            // 发起第一个异步请求
            xgSupply.value = (await TokenManager.getSupply(environment.xg)) / 1e6;
            // 发起第二个异步请求
            xusdSupply.value = (await TokenManager.getSupply(environment.xusd)) / 1e6;
            // 3
            const pair = await SwapManager.getPair(environment.xg, environment.xusd);
            xgPrice.value = +((pair.reserve1 / pair.reserve0) * xusdPrice.value).toPrecision(3);

            const xlpShare = await TokenManager.getTokenBalance(pair.xlp, environment.burner);
            poolXG.value = +((pair.reserve0 * xlpShare) / pair.xlpSupply).toFixed(2);
            poolXUSD.value += +((pair.reserve1 * xlpShare) / pair.xlpSupply).toFixed(2);
            // 4
            const poolPair = await SwapManager.getPair('iost', environment.xusd);
            poolIOST.value = +((poolPair.reserve0 * xlpShare) / poolPair.xlpSupply).toFixed(2);
            poolXUSD.value += +((poolPair.reserve1 * xlpShare) / poolPair.xlpSupply).toFixed(2);
            // 5
            const vostPair = await SwapManager.getPair('vost', environment.xusd);
            poolVOST.value = +((vostPair.reserve0 * xlpShare) / vostPair.xlpSupply).toFixed(2);
            poolXUSD.value += +((vostPair.reserve1 * xlpShare) / vostPair.xlpSupply).toFixed(2);
            // 6
            stabFund.value = (await TokenManager.getTokenBalance('iost', environment.bank)).toFixed(
              0,
            );
            //7
            iostLocked.value = (
              (await TokenManager.getTokenBalance('vost', environment.bank)) +
              (await TokenManager.getTokenBalance('vost', environment.swap)) +
              (await TokenManager.getTokenBalance('iost', environment.swap))
            ).toFixed(0);
          } catch (error) {
            console.error(error);
          }
          waiting.value = false;
        } else {
          console.log('未连接钱包');
        }
      };
      return {
        xgSupply,
        xgPrice,
        xusdSupply,
        xusdPrice,
        poolIOST,
        poolVOST,
        poolXUSD,
        poolXG,
        stabFund,
        iostLocked,
        waiting,
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
