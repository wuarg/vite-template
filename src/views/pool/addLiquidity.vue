<template>
  <div class="p-10">
    <Modal ref="childRef" title="添加流动性" @onHide="onHide">
      <div class="xg-add-liquidity">
        <div class="card xg-add-liquidity-outerbox">
          <div>
            <h5>添加流动性</h5>
          </div>

          <div class="xg-add-liquidity-pannel card bg-primary">
            <div class="row" style="margin-bottom: 14px">
              <div class="col col-4"> 币种A </div>
              <div class="col col-8 text-right"> 可用: {{ fromBalance }} </div>
            </div>
            <div class="row" style="margin-bottom: 2px">
              <div class="col">
                <input
                  v-model="amountIn"
                  class="form-control"
                  type="text"
                  placeholder="0.0"
                  :disabled="waiting"
                  @keydown="checkAmount($event)"
                  @keyup="enterFromAmount()"
                  @change="enterFromAmount()"
                />
              </div>
              <div class="col col-auto">
                <button
                  class="btn btn-sm btn-light"
                  style="margin-right: 6px"
                  :disabled="waiting"
                  @click="goMaxFrom()"
                >
                  最大
                </button>
                <button
                  class="btn btn-sm btn-dark"
                  :disabled="waiting"
                  @click="showTokenSelection(0)"
                >
                  <img
                    v-if="fromTokenName != '---'"
                    src="/src/assets/tokens/{{fromTokenImage}}.png"
                    width="20"
                  />
                  {{ fromTokenName }} ↓
                </button>
              </div>
            </div>
          </div>
          <div class="xg-add-liquidity-plus text-center">
            <span> + </span>
          </div>
          <div class="xg-add-liquidity-pannel card bg-primary">
            <div class="row" style="margin-bottom: 14px">
              <div class="col col-4"> 币种B </div>
              <div class="col col-8 text-right"> 可用: {{ toBalance }} </div>
            </div>
            <div class="row" style="margin-bottom: 2px">
              <div class="col">
                <input
                  v-model="amountOut"
                  class="form-control"
                  type="text"
                  placeholder="0.0"
                  :disabled="waiting"
                  @keydown="checkAmount($event)"
                  @keyup="enterToAmount()"
                  @change="enterToAmount()"
                />
              </div>
              <div class="col col-auto">
                <button
                  class="btn btn-sm btn-light"
                  style="margin-right: 6px"
                  :disabled="waiting"
                  @click="goMaxTo()"
                >
                  最大
                </button>
                <button class="btn btn-sm btn-dark" @click="showTokenSelection(1)">
                  <img
                    v-if="toTokenName != '---'"
                    src="/src/assets/tokens/{{toTokenImage}}.png"
                    width="20"
                  />
                  {{ toTokenName }} ↓
                </button>
              </div>
            </div>
          </div>

          <div v-if="amountIn && amountOut && ratioValue" class="row" style="margin-top: 10px">
            <div class="col col-auto text-left">
              当前比例 (<a href="javascript: void(0)" @click="!waiting && reverseRatio()">反向</a>)
            </div>
            <div class="col text-right">
              <span v-if="ratioDirection">
                {{ '1 ' + toTokenName + ' = ' + ratioValue + ' ' + fromTokenName }}
              </span>
              <span v-if="!ratioDirection">
                {{ '1 ' + fromTokenName + ' = ' + ratioValue + ' ' + toTokenName }}
              </span>
            </div>
          </div>

          <div v-if="amountIn && amountOut && shareOfPool" class="row" style="margin-top: 10px">
            <div class="col col-auto text-left"> 流动池占比 </div>
            <div class="col text-right"> {{ +(shareOfPool * 100).toFixed(4) }}% </div>
          </div>

          <div class="row" style="margin-top: 10px; margin-down: 10px">
            <div class="col col-9 text-left">
              滑点 (<a href="javascript: void(0)" @click="!waiting && showSlippage()">更改</a>)
            </div>
            <div class="col text-right"> {{ slippageValue / 10 }}% </div>
          </div>

          <div style="margin-top: 10px">
            <button
              class="input-btn btn"
              :class="{ 'btn-danger': !waiting, 'btn-light': waiting }"
              style="width: 100%"
              type="button"
              :disabled="willDisable || waiting"
              @click="submit()"
            >
              {{ waiting ? '提交中...' : buttonMessageArray[0] }}
            </button>
          </div>
          <!-- <div>
            <button class="btn btn-dark" style="width: 100%; margin-top: 10px" @click="cancel()">{{
              ['取消', 'Cancel'][language]
            }}</button>
          </div> -->
        </div>
      </div>
    </Modal>
    <TokenSelect
      :will-show-token-selection="willShowTokenSelection"
      @onSelect="onTokenSelection($event)"
      @onHide="onCloseTokenSelection()"
    />
  </div>
</template>
<script lang="ts">
  import Modal from '~/components/core/Modal.vue';
  import { defineComponent, ref, onMounted, watch, SetupContext } from 'vue';
  import { commonStore } from '~/stores/modules/common';
  import { environment } from '~/utils/iostConfig';
  import { ContractService } from '~/utils/contractServe';
  import { SwapManager } from '~/utils/swapManager';
  import { TokenManager } from '~/utils/tokenManager';
  import TokenSelect from '~/views/pool/tokenSelect.vue';
  export default defineComponent({
    name: 'TemplateVue',
    components: {
      Modal,
      TokenSelect,
    },
    props: {
      willShowAddLiquidity: {
        type: Boolean,
      },
      tokenA: {
        type: String,
        default: 'iost',
      },
      tokenB: {
        type: String,
        default: 'iost',
      },
    },
    setup(props, context: SetupContext) {
      watch(
        () => props.willShowAddLiquidity,
        (newValue, oldValue) => {
          if (newValue === true) {
            callChildMethod();
          }
        },
      );

      const childRef = ref(null);
      const callChildMethod = () => {
        if (childRef.value) {
          (childRef.value as any).show();
        }
      };
      const onHide = () => {
        context.emit('onHide');
      };

      const waiting = ref(false);
      const appStore = commonStore();
      const myIOST = appStore.getMyIOST;
      const walletReady = appStore.getWalletReady;
      const account = appStore.getAccount;

      const willShowTokenSelection = ref(false);
      const tokenSelectionIndex = ref(0);
      const fromTokenName = ref('---');
      const fromTokenImage = ref('_');
      const fromBalance = ref(0);
      const toTokenName = ref('iost');
      const toTokenImage = ref('iost');

      const toBalance = ref(0);
      const iostBalance = ref(0);

      const amountIn = ref('');
      const amountInOld = ref('');
      const amountOut = ref('');
      const amountOutOld = ref('');

      const workingOnOut = ref(true);
      const ratioValue = ref(0);
      const ratioDirection = ref(false);
      const shareOfPool = ref(0);

      const willShowSlippage = ref(false);
      const slippageValue = ref(10);

      const willDisable = ref(true);

      const tokenA = ref(props.tokenA);
      const tokenB = ref(props.tokenB);
      const pair = ref<Record<string, any>>({});
      // pair: any = null;
      // interval: any = null;

      const buttonMessageArray = ref<Record<string, any>>([]);
      const alertTitleCN = ref('');
      const alertTitleEN = ref('');
      const alertBodyCN = ref('');
      const alertBodyEN = ref('');
      const willShowAlertMessage = ref(false);

      onMounted(() => {
        load();
        const slippageValueType = parseInt(localStorage.getItem('-xg-slippage'));
        if ([1, 5, 10, 50, 100].indexOf(slippageValueType) >= 0) {
          slippageValue.value = slippageValueType;
        }

        // this.interval = setInterval(() => {
        //   // Every 10 seconds, preprocess in case reserver changes.
        //   this.preProcess(true);
        // }, 10 * 1e3);
      });
      const load = async () => {
        waiting.value = true;
        await SwapManager.constructor(myIOST);
        await TokenManager.constructor(myIOST);
        if (walletReady && account) {
          try {
            // 发起第一个异步请求
            if (tokenA.value && props.tokenB) {
              fromTokenName.value = tokenA.value;
              fromTokenImage.value = tokenA.value;
              toTokenName.value = tokenB.value;
              toTokenImage.value = tokenB.value;
              pair.value = await SwapManager.getPair(tokenA.value, tokenB.value);
              buttonMessageArray.value = ['请输入数额', 'Enter an amount'];
            } else {
              buttonMessageArray.value = ['请选择代币', 'Select a token'];
            }

            if (fromTokenName.value) {
              fromBalance.value = +(await TokenManager.getTokenBalance(fromTokenName.value)) || 0;
            }

            if (toTokenName.value) {
              toBalance.value = +(await TokenManager.getTokenBalance(toTokenName.value)) || 0;
            }
          } catch (error) {
            console.error(error);
          }
          waiting.value = false;
        } else {
          console.log('未连接钱包');
        }
      };

      const showTokenSelection = (index: number) => {
        willShowTokenSelection.value = true;
        tokenSelectionIndex.value = index;
      };

      const onTokenSelection = async ($event: any) => {
        const tokenName = $event.tokenName;
        const balance = $event.balance;
        const imageList = await TokenManager.getImageList();

        if (tokenSelectionIndex.value == 0) {
          fromTokenName.value = tokenName;
          fromTokenImage.value = imageList.indexOf(tokenName) >= 0 ? tokenName : '_';

          if (fromTokenName.value == 'iost') {
            fromBalance.value = Math.max(balance - 20000, 0);
          } else {
            fromBalance.value = balance;
          }

          if (toTokenName.value == fromTokenName.value) {
            toTokenName.value = '---';
          }
        } else {
          toTokenName.value = tokenName;
          toTokenImage.value = imageList.indexOf(tokenName) >= 0 ? tokenName : '_';

          if (toTokenName.value == 'iost') {
            toBalance.value = Math.max(balance - 20000, 0);
          } else {
            toBalance.value = balance;
          }

          if (fromTokenName.value == toTokenName.value) {
            fromTokenName.value = '---';
          }
        }

        willShowTokenSelection.value = false;
        preProcess(true);
      };

      const onCloseTokenSelection = () => {
        willShowTokenSelection.value = false;
      };

      const goMaxFrom = () => {
        amountIn.value = fromBalance.value.toString();
        enterFromAmount();
      };

      const goMaxTo = () => {
        amountOut.value = toBalance.value.toString();
        enterToAmount();
      };

      const preProcess = async (willReloadPair: any) => {
        if (fromTokenName.value == '---' || toTokenName.value == '---') {
          willDisable.value = true;
          buttonMessageArray.value = ['请选择代币', 'Select a token'];
          return;
        }

        if (willReloadPair) {
          pair.value = await SwapManager.getPair(fromTokenName.value, toTokenName.value);
        }

        if (!pair.value) {
          willDisable.value = true;
          buttonMessageArray.value = ['交易对不存在', "Pair doesn't exist"];
          return;
        }

        var valueIn = parseFloat(amountIn.value);
        var valueOut = parseFloat(amountOut.value);

        if ((workingOnOut.value && !valueIn) || (!workingOnOut.value && !valueOut)) {
          willDisable.value = true;
          buttonMessageArray.value = ['请输入数额', 'Enter an amount'];

          // When the user deletes, the other value should also delete.
          if (+pair.value.reserve0 && +pair.value.reserve1) {
            if (workingOnOut.value) {
              amountOut.value = '';
              amountOutOld.value = '';
            } else {
              amountIn.value = '';
              amountInOld.value = '';
            }
          }
          return;
        }

        if (
          pair.value.token0 == fromTokenName.value &&
          +pair.value.reserve0 &&
          +pair.value.reserve1
        ) {
          if (workingOnOut.value) {
            amountOut.value = ((valueIn * pair.value.reserve1) / pair.value.reserve0).toFixed(
              pair.value.precision1,
            );
            amountOutOld.value = amountOut.value;
            valueOut = parseFloat(amountOut.value);
          } else {
            amountIn.value = ((valueOut * pair.value.reserve0) / pair.value.reserve1).toFixed(
              pair.value.precision0,
            );
            amountInOld.value = amountIn.value;
            valueIn = parseFloat(amountIn.value);
          }
        } else if (+pair.value.reserve0 && +pair.value.reserve1) {
          if (workingOnOut.value) {
            amountOut.value = ((valueIn * pair.value.reserve0) / pair.value.reserve1).toFixed(
              pair.value.precision0,
            );
            amountOutOld.value = amountOut.value;
            valueOut = parseFloat(amountOut.value);
          } else {
            amountIn.value = ((valueOut * pair.value.reserve1) / pair.value.reserve0).toFixed(
              pair.value.precision1,
            );
            amountInOld.value = amountIn.value;
            valueIn = parseFloat(amountIn.value);
          }
        }

        if (!valueIn || !valueOut) {
          willDisable.value = true;
          buttonMessageArray.value = ['请输入数额', 'Enter an amount'];
          return;
        }

        if (ratioDirection.value) {
          ratioValue.value = +(valueIn / valueOut).toPrecision(4);
        } else {
          ratioValue.value = +(valueOut / valueIn).toPrecision(4);
        }

        if (+pair.value.xlpSupply > 0) {
          shareOfPool.value =
            (await SwapManager.getTokenBalance(pair.value.xlp)) / pair.value.xlpSupply;
        } else {
          shareOfPool.value = 1;
        }

        if (valueIn > fromBalance.value) {
          willDisable.value = true;
          buttonMessageArray.value = [
            fromTokenName.value + '余额不足',
            fromTokenName.value + ' not enough balance',
          ];
          return;
        }

        if (valueOut > toBalance.value) {
          willDisable.value = true;
          buttonMessageArray.value = [
            toTokenName.value + '余额不足',
            toTokenName.value + ' not enough balance',
          ];
          return;
        }

        willDisable.value = false;
        buttonMessageArray.value = ['提交', 'Submit'];
      };

      const enterFromAmount = async () => {
        workingOnOut.value = true;

        if (isNaN(+amountIn.value)) {
          amountIn.value = amountInOld.value;
          return;
        }

        amountIn.value = amountIn.value.trim();
        amountInOld.value = amountIn.value;
        preProcess(false);
      };

      const enterToAmount = async () => {
        workingOnOut.value = false;

        if (isNaN(+amountOut.value)) {
          amountOut.value = amountOutOld.value;
          return;
        }

        amountOut.value = amountOut.value.trim();
        amountOutOld.value = amountOut.value;
        preProcess(false);
      };

      const checkAmount = ($event: any) => {
        if (environment.allowedKeycodes.indexOf($event.which) < 0) {
          return false;
        }

        return true;
      };

      const reverseRatio = () => {
        ratioDirection.value = !ratioDirection.value;
        preProcess(false);
      };

      const showSlippage = () => {
        willShowSlippage.value = true;
      };

      const onSlippage = ($event: any) => {
        slippageValue.value = $event.value;
        willShowSlippage.value = false;
      };

      const onCloseSlippage = () => {
        willShowSlippage.value = false;
      };

      const submit = async () => {
        await addLiquidity();
      };

      const cancel = () => {
        // this.onClose.emit();
        context.emit('onClose');
      };

      const addLiquidity = async () => {
        waiting.value = true;
        try {
          const res = await ContractService.addLiquidity(
            fromTokenName.value,
            toTokenName.value,
            +amountIn.value,
            +amountOut.value,
            +(+amountIn.value * (1 - slippageValue.value / 1000)).toFixed(pair.value.precision0),
            +(+amountOut.value * (1 - slippageValue.value / 1000)).toFixed(pair.value.precision1),
          );

          // this.showAlert('流动性添加成功', 'Liquidity added successfully',
          //    '如果还没有看到，请几秒后刷新页面',
          //    'If you don\'t see what you added, please refresh the page in a few seconds')

          amountIn.value = '';
          amountInOld.value = '';
          amountOut.value = '';
          amountOutOld.value = '';
          preProcess(true);

          if (fromTokenName.value) {
            fromBalance.value = +(await TokenManager.getTokenBalance(fromTokenName.value)) || 0;
          }

          if (toTokenName.value) {
            toBalance.value = +(await TokenManager.getTokenBalance(toTokenName.value)) || 0;
          }

          // this.onAdd.emit();
          context.emit('onAdd');
        } catch (err) {
          // if (err.indexOf('gas not enough') >= 0) {
          //   this.showAlert('Gas不足', 'Gas not enough',
          //       '请通过抵押获得更多', 'Please pledge IOST to get more');
          // } else if (err.indexOf('pay ram failed') >= 0) {
          //   this.showAlert('Ram不足', 'Ram not enough',
          //       '请通过购买获得更多', 'Please buy some with IOST');
          // } else if (err.indexOf('Xigua: no pair') >= 0) {
          //   this.showAlert('添加失败', 'Transaction Failed', '该交易对不存在', 'The pair doesn\'t exit')
          // } else {
          //   this.showAlert('添加失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          // }
        }

        waiting.value = false;
      };

      // showAlert(titleCN: string, titleEN: string, bodyCN: string, bodyEN: string) {
      //   this.alertTitleCN = titleCN;
      //   this.alertTitleEN = titleEN;
      //   this.alertBodyCN = bodyCN;
      //   this.alertBodyEN = bodyEN;
      //   this.willShowAlertMessage = true;
      // }
      return {
        childRef,
        onHide,
        waiting,
        fromBalance,
        amountIn,
        fromTokenName,
        fromTokenImage,
        toBalance,
        amountOut,
        toTokenName,
        toTokenImage,
        ratioDirection,
        ratioValue,
        shareOfPool,
        slippageValue,
        willDisable,
        buttonMessageArray,
        willShowTokenSelection,
        checkAmount,
        enterFromAmount,
        goMaxFrom,
        showTokenSelection,
        enterToAmount,
        goMaxTo,
        reverseRatio,
        showSlippage,
        submit,
        onTokenSelection,
        onCloseTokenSelection,
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
