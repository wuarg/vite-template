<template>
  <div class="pool p-10">
    <div class="xg-pool">
      <div class="jumbotron xg-pool-jumbotron xg-pool-bound text-center">
        <h6 class="text-center" style="margin-top: 8px">
          流动性提供者可以按照流动池的占比，获得交易中0.25%的手续费。手续费将实时收取，并在您退出流动性的时候兑现。
        </h6>
      </div>

      <div class="row xg-pool-bar xg-pool-bound" style="margin-bottom: 20px">
        <div class="col col-auto text-left"> 您加入的流动池 </div>
        <div class="col text-right">
          <button class="btn btn-sm btn-light" style="margin-right: 12px" @click="showCreatePair()"
            >创建交易对</button
          >
          <button class="btn btn-sm btn-danger" @click="showAddLiquidity('', '', -1)"
            >添加流动性</button
          >
        </div>
      </div>

      <div v-if="waiting">
        <img
          src="../../assets/xigua/loading.gif"
          style="margin: 100px auto; display: block; width: 80px"
        />
      </div>

      <div v-if="!waiting">
        <div
          v-for="(obj, i) in myPairObjs"
          :key="i"
          class="card xg-pool-card xg-pool-bound"
          style="margin-bottom: 10px"
        >
          <div class="row">
            <div class="col text-left"> {{ obj.token0 }} / {{ obj.token1 }} </div>
            <div class="col text-right">
              <span v-if="!obj.showing" class="xg-pool-manage" @click="showPair(+i)">管理 ↓</span>
              <span v-if="obj.showing" class="xg-pool-manage" @click="hidePair(+i)">收起 ↑</span>
            </div>
          </div>
          <div v-if="obj.loading" class="row">
            <div class="col text-center"> 加载中... </div>
          </div>
          <div v-if="obj.showing" class="xg-pool-line">
            <div class="row">
              <div class="col text-left"> 我的流动池凭证(XLP) </div>
              <div class="col text-right">
                {{ obj.xlpAmount }}
              </div>
            </div>
            <div class="row">
              <div class="col text-left"> 我的池中{{ obj.token0 }} </div>
              <div class="col text-right">
                {{ obj.token0Amount.toFixed(6) }}
              </div>
            </div>
            <div class="row">
              <div class="col text-left"> 我的池中{{ obj.token1 }} </div>
              <div class="col text-right">
                {{ obj.token1Amount.toFixed(6) }}
              </div>
            </div>
            <div class="row">
              <div class="col text-left"> 我的流动池占比 </div>
              <div class="col text-right"> {{ +(obj.xlpShare * 100).toFixed(2) }}% </div>
            </div>
            <div class="row">
              <div class="col text-left">
                <button
                  class="btn btn-sm btn-dark"
                  style="width: 100%"
                  @click="showAddLiquidity(obj.token0, obj.token1, +i)"
                  >添加</button
                >
              </div>
              <div class="col text-right">
                <button
                  class="btn btn-sm btn-dark"
                  style="width: 100%"
                  @click="showRemoveLiquidity(obj.token0, obj.token1, +i)"
                  >减少</button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CreatePair
      :will-show-create-pair="willShowCreatePair"
      @onCreate="onCreatePair()"
      @onHide="onCloseCreatePair()"
    />
    <AddLiquidity
      :will-show-add-liquidity="willShowAddLiquidity"
      :token-a="addLiquidityTokenA"
      :token-b="addLiquidityTokenB"
      @onAdd="onAddLiquidity()"
      @onHide="onCloseAddLiquidity()"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { commonStore } from '~/stores/modules/common';
  import { environment } from '~/utils/iostConfig';
  import { ContractService } from '~/utils/contractServe';
  import { SwapManager } from '~/utils/swapManager';
  import CreatePair from '~/views/pool/createPair.vue';
  import AddLiquidity from '~/views/pool/addLiquidity.vue';
  export default defineComponent({
    name: 'PoolVue',
    components: {
      CreatePair,
      AddLiquidity,
    },
    setup() {
      const waiting = ref(false);
      const appStore = commonStore();
      const allPairs = appStore.getAllPairs;
      const myIOST = appStore.getMyIOST;
      const walletReady = appStore.getWalletReady;
      const account = appStore.getAccount;

      const willShowCreatePair = ref(false);

      const willShowAddLiquidity = ref(false);
      const addLiquidityTokenA = ref('');
      const addLiquidityTokenB = ref('');
      const addLiquidityIndex = ref(0);

      const willShowRemoveLiquidity = ref(false);
      const removeLiquidityToken0 = ref('');
      const removeLiquidityToken1 = ref('');
      const removeLiquidityIndex = ref(0);

      const myPairObjs = ref<Record<string, any>>([]);

      const alertTitleCN = ref('');
      const alertTitleEN = ref('');
      const alertBodyCN = ref('');
      const alertBodyEN = ref('');
      const willShowAlertMessage = ref(false);

      onMounted(() => {
        load();
      });
      const load = async () => {
        waiting.value = true;
        await SwapManager.constructor(myIOST);
        if (walletReady && account) {
          try {
            // 发起第一个异步请求
            const myPairs = await SwapManager.myPairs(allPairs, ContractService.getUserAddress());
            myPairObjs.value = myPairs.map((pair) => {
              return {
                token0: pair[0],
                token1: pair[1],
                loading: false,
                showing: false,
              };
            });
          } catch (error) {
            console.error(error);
          }
          waiting.value = false;
        } else {
          console.log('未连接钱包');
        }
      };

      const showPair = async (index: number) => {
        await loadPair(index);
        myPairObjs.value[index].showing = true;
      };

      const hidePair = (index: number) => {
        myPairObjs.value[index].showing = false;
      };

      const loadPair = async (index: number) => {
        myPairObjs.value[index].loading = true;
        const pair = await SwapManager.getPair(
          myPairObjs.value[index].token0,
          myPairObjs.value[index].token1,
        );
        myPairObjs.value[index].xlpAmount = await SwapManager.getTokenBalance(pair.xlp);
        myPairObjs.value[index].xlpShare = +pair.xlpSupply
          ? myPairObjs.value[index].xlpAmount / +pair.xlpSupply
          : 0;
        myPairObjs.value[index].token0Amount = myPairObjs.value[index].xlpShare * pair.reserve0;
        myPairObjs.value[index].token1Amount = myPairObjs.value[index].xlpShare * pair.reserve1;
        myPairObjs.value[index].loading = false;
      };

      const showCreatePair = () => {
        willShowCreatePair.value = true;
      };

      const showAddLiquidity = (tokenA: string, tokenB: string, index: number) => {
        addLiquidityTokenA.value = tokenA;
        addLiquidityTokenB.value = tokenB;
        addLiquidityIndex.value = index;
        willShowAddLiquidity.value = true;
      };

      const showRemoveLiquidity = (token0: string, token1: string, index: number) => {
        removeLiquidityToken0.value = token0;
        removeLiquidityToken1.value = token1;
        removeLiquidityIndex.value = index;
        willShowRemoveLiquidity.value = true;
      };

      const onCreatePair = () => {
        load();
      };

      const onCloseCreatePair = () => {
        willShowCreatePair.value = false;
      };

      const onAddLiquidity = () => {
        if (addLiquidityIndex.value >= 0) {
          loadPair(addLiquidityIndex.value);
        } else {
          load();
        }
      };

      const onCloseAddLiquidity = () => {
        willShowAddLiquidity.value = false;
      };

      const onRemoveLiquidity = ($event: any) => {
        willShowRemoveLiquidity.value = false;

        // this.showAlert('流动性去除成功', 'Liquidity removed successfully',
        //    '如果还没有看到，请几秒后刷新页面',
        //    'If you don\'t see what you added, please refresh the page in a few seconds')

        if (removeLiquidityIndex.value >= 0 && $event.value < 100) {
          loadPair(removeLiquidityIndex.value);
        } else {
          // If removed 100% liquidity.
          load();
        }
      };

      const onCloseRemoveLiquidity = () => {
        willShowRemoveLiquidity.value = false;
      };
      return {
        waiting,
        myPairObjs,
        willShowCreatePair,
        willShowAddLiquidity,
        addLiquidityTokenA,
        addLiquidityTokenB,
        onCreatePair,
        onCloseCreatePair,
        onAddLiquidity,
        onCloseAddLiquidity,
        showCreatePair,
        showAddLiquidity,
        showPair,
        hidePair,
        showRemoveLiquidity,
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
