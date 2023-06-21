<template>
  <div class="p-10">
    <Modal ref="childRef" title="添加交易对" @onHide="onHide">
      <div class="xg-create-pair">
        <div class="card xg-create-pair-outerbox">
          <div>
            <h5>添加新的交易对</h5>
          </div>

          <div class="xg-create-pair-pannel card bg-primary">
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
                    :src="`/src/assets/tokens/${fromTokenImage}.png`"
                    width="20"
                  />
                  {{ fromTokenName }} ↓
                </button>
              </div>
            </div>
          </div>
          <div class="xg-create-pair-plus text-center">
            <span> + </span>
          </div>
          <div class="xg-create-pair-pannel card bg-primary">
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
                    :src="`/src/assets/tokens/${toTokenImage}.png`"
                    width="20"
                  />
                  {{ toTokenName }} ↓
                </button>
              </div>
            </div>
          </div>
          <div class="xg-create-pair-plus text-center">
            <span> + </span>
          </div>

          <div class="xg-create-pair-pannel card bg-primary">
            <span>上币费: 200 xg</span>
          </div>

          <div v-if="amountIn && amountOut && ratioValue" class="row" style="margin-top: 10px">
            <div class="col col-auto text-left">
              初始定价 (<a href="javascript: void(0)" @click="!waiting && reverseRatio()">反向</a>)
            </div>
            <div class="col text-right">
              {{
                ratioDirection
                  ? '1 ' + toTokenName + ' = ' + ratioValue + ' ' + fromTokenName
                  : '1 ' + fromTokenName + ' = ' + ratioValue + ' ' + toTokenName
              }}
            </div>
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
  import { commonStore } from '~/stores/modules/common';
  import Modal from '~/components/core/Modal.vue';
  import { defineComponent, ref, onMounted, watch, SetupContext } from 'vue';
  import { environment } from '~/utils/iostConfig';
  import { ContractService } from '~/utils/contractServe';
  import { SwapManager } from '~/utils/swapManager';
  import { TokenManager } from '~/utils/tokenManager';
  import TokenSelect from '~/views/pool/tokenSelect.vue';
  export default defineComponent({
    name: 'CreatePairVue',
    components: {
      Modal,
      TokenSelect,
    },
    props: {
      willShowCreatePair: {
        type: Boolean,
      },
    },
    setup(props, context: SetupContext) {
      watch(
        () => props.willShowCreatePair,
        (newValue, oldValue) => {
          if (newValue === true) {
            callChildMethod();
          }
        },
      );

      onMounted(() => {
        load();
      });

      const childRef = ref(null);
      const callChildMethod = () => {
        if (childRef.value) {
          (childRef.value as any).show();
        }
      };

      const appStore = commonStore();
      const allPairs = ref<Record<string, any>>(appStore.getAllPairs);
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
      const xgBalance = ref(0);

      const amountIn = ref('');
      const amountInOld = ref('');
      const amountOut = ref('');
      const amountOutOld = ref('');

      const ratioValue = ref(0);
      const ratioDirection = ref(false);
      const waiting = ref(false);

      const willDisable = ref(true);
      const buttonMessageArray = ref<Record<string, any>>([]);
      const alertTitleCN = ref('');
      const alertTitleEN = ref('');
      const alertBodyCN = ref('');
      const alertBodyEN = ref('');
      const willShowAlertMessage = ref(false);

      const load = async () => {
        waiting.value = true;
        await TokenManager.constructor(myIOST);
        if (walletReady && account) {
          try {
            // 发起第一个异步请求
            buttonMessageArray.value = ['请选择代币', 'Select a token'];
            loadInitialBalance();
          } catch (error) {
            console.error(error);
          }
          waiting.value = false;
        } else {
          console.log('未连接钱包');
        }
      };

      const loadInitialBalance = async () => {
        xgBalance.value = +(await TokenManager.getTokenBalance('xg')) || 0;

        if (toTokenName.value == 'xg') {
          toBalance.value = xgBalance.value;
        } else {
          toBalance.value = +(await TokenManager.getTokenBalance(toTokenName.value)) || 0;
        }
      };

      const showTokenSelection = (index: number) => {
        willShowTokenSelection.value = true;
        tokenSelectionIndex.value = index;
      };

      const onTokenSelection = async ($event: any) => {
        console.log('onTokenSelection-----', $event);
        const tokenName = $event.tokenName;
        const balance = $event.balance;
        const imageList = await TokenManager.getImageList();

        if (tokenSelectionIndex.value == 0) {
          fromTokenName.value = tokenName;
          fromTokenImage.value = imageList.indexOf(tokenName) >= 0 ? tokenName : '_';

          if (fromTokenName.value == 'xg') {
            fromBalance.value = Math.max(balance - 200, 0);
          } else {
            fromBalance.value = balance;
          }

          if (toTokenName.value == fromTokenName.value) {
            toTokenName.value = '---';
          }
        } else {
          toTokenName.value = tokenName;
          toTokenImage.value = imageList.indexOf(tokenName) >= 0 ? tokenName : '_';

          if (toTokenName.value == 'xg') {
            toBalance.value = Math.max(balance - 200, 0);
          } else {
            toBalance.value = balance;
          }

          if (fromTokenName.value == toTokenName.value) {
            fromTokenName.value = '---';
          }
        }

        willShowTokenSelection.value = false;
        console.log('willShowTokenSelection---22-', willShowTokenSelection.value);
        onCloseTokenSelection();
        preProcess();
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

      const preProcess = () => {
        if (fromTokenName.value == '---' || toTokenName.value == '---') {
          willDisable.value = true;
          buttonMessageArray.value = ['请选择代币', 'Select a token'];
          return;
        }

        const valueIn = parseFloat(amountIn.value);
        const valueOut = parseFloat(amountOut.value);

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

        if (valueIn > fromBalance.value || valueOut > toBalance.value) {
          willDisable.value = true;
          buttonMessageArray.value = ['余额不足', 'Not enough balance'];
          return;
        }

        if (
          (fromTokenName.value == 'xg' && valueIn + 200 > xgBalance.value) ||
          (toTokenName.value == 'xg' && valueOut + 200 > xgBalance.value) ||
          xgBalance.value < 200
        ) {
          willDisable.value = true;
          buttonMessageArray.value = ['xg余额不足', 'Not enough xg'];
          return;
        }

        willDisable.value = false;
        buttonMessageArray.value = ['提交', 'Submit'];
      };

      const enterFromAmount = async () => {
        if (isNaN(+amountIn.value)) {
          amountIn.value = amountInOld.value;
          return;
        }

        amountIn.value = amountIn.value.trim();
        amountInOld.value = amountIn.value;
        preProcess();
      };

      const enterToAmount = async () => {
        if (isNaN(+amountOut.value)) {
          amountOut.value = amountOutOld.value;
          return;
        }

        amountOut.value = amountOut.value.trim();
        amountOutOld.value = amountOut.value;
        preProcess();
      };

      const checkAmount = ($event: any) => {
        if (
          [8, 16, 17, 91, 37, 39, 86, 190, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57].indexOf(
            $event.which,
          ) < 0
        ) {
          return false;
        }

        return true;
      };

      const reverseRatio = () => {
        ratioDirection.value = !ratioDirection.value;
        preProcess();
      };

      const submit = async () => {
        await createPairAndAddLiquidity();
      };

      const cancel = () => {
        context.emit('onClose');
      };

      const createPairAndAddLiquidity = async () => {
        waiting.value = true;
        try {
          const res = await ContractService.createPairAndAddLiquidity(
            fromTokenName.value,
            toTokenName.value,
            +amountIn.value,
            +amountOut.value,
          );

          allPairs.value.push([fromTokenName.value, toTokenName.value]);

          // this.showAlert('添加成功', 'Pair Added Successfully',
          //    '如果您希望给代币添加图标，请发邮件到contact@xigua.ist申请',
          //    'If you wanna add an icon for certain token, please apply by email contact@xigua.ist')

          amountIn.value = '';
          amountInOld.value = '';
          amountOut.value = '';
          amountOutOld.value = '';
          preProcess();

          if (fromTokenName.value) {
            fromBalance.value = +(await TokenManager.getTokenBalance(fromTokenName.value)) || 0;
          }

          if (toTokenName.value) {
            toBalance.value = +(await TokenManager.getTokenBalance(toTokenName.value)) || 0;
          }
          context.emit('onCreate');
        } catch (err) {
          // if (err.indexOf('gas not enough') >= 0) {
          //   this.showAlert(
          //     'Gas不足',
          //     'Gas not enough',
          //     '请通过抵押获得更多',
          //     'Please pledge IOST to get more',
          //   );
          // } else if (err.indexOf('pay ram failed') >= 0) {
          //   this.showAlert(
          //     'Ram不足',
          //     'Ram not enough',
          //     '请通过购买获得更多',
          //     'Please buy some with IOST',
          //   );
          // } else if (err.indexOf('pair exists') >= 0) {
          //   this.showAlert(
          //     '添加失败',
          //     'Transaction Failed',
          //     '该交易对已经存在',
          //     'The pair already exits',
          //   );
          // } else {
          //   this.showAlert('添加失败', 'Transaction Failed', '请再次尝试', 'Please try again');
          // }
        }

        waiting.value = false;
      };
      const onHide = () => {
        context.emit('onHide');
      };
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
        ratioValue,
        ratioDirection,
        checkAmount,
        enterFromAmount,
        goMaxFrom,
        showTokenSelection,
        enterToAmount,
        goMaxTo,
        reverseRatio,
        willDisable,
        submit,
        buttonMessageArray,
        willShowTokenSelection,
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
