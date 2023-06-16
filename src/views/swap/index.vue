<template>
  <div class="swap p-10">
    <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow-y: auto">
      <div :class="{ 'xg-swap': !isMobile }">
        <div class="xg-swap-container card" style="margin: 10px auto 0 auto">
          <div class="xg-swap-pannel card bg-primary">
            <div class="row" style="margin-bottom: 14px">
              <div class="col col-4"> 从 </div>
              <div class="col col-8 text-right"> 余额: {{ fromBalance }} </div>
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
                  @keyup="enterInAmount()"
                  @change="enterInAmount()"
                />
              </div>
              <div class="col col-auto">
                <button
                  class="btn btn-sm btn-light"
                  style="margin-right: 6px"
                  :disabled="waiting"
                  @click="goMax()"
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
                    src="/assets/tokens/{{fromTokenImage}}.png"
                    width="20"
                  />
                  {{ fromTokenName }} ↓
                </button>
              </div>
            </div>
          </div>
          <div class="xg-swap-reverse text-center">
            <span @click="!waiting && goReverse()"> ↑↓ </span>
          </div>
          <div class="xg-swap-pannel card bg-primary">
            <div class="row" style="margin-bottom: 14px">
              <div class="col col-4"> 到 </div>
              <div class="col col-8 text-right"> 余额: {{ toBalance }} </div>
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
                  @keyup="enterOutAmount()"
                  @change="enterOutAmount()"
                />
              </div>
              <div class="col col-auto">
                <button class="btn btn-sm btn-dark" @click="showTokenSelection(1)">
                  <img
                    v-if="toTokenName != '---'"
                    src="/assets/tokens/{{toTokenImage}}.png"
                    width="20"
                  />
                  {{ toTokenName }} ↓
                </button>
              </div>
            </div>
          </div>
          <div v-if="amountIn && amountOut && ratioValue" class="row" style="margin: 10px 0 0 0">
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
          <div class="row" style="margin: 10px 0px">
            <div class="col col-9">
              滑点 (<a href="javascript: void(0)" @click="!waiting && showSlippage()">更改</a>)
            </div>
            <div class="col text-right"> {{ slippageValue / 10 }}% </div>
          </div>
          <div>
            <button
              class="input-btn btn"
              :class="{ 'btn-danger': !waiting, 'btn-light': waiting }"
              style="width: 100%"
              type="button"
              :disabled="willDisable || waiting"
              @click="goSwap()"
            >
              {{ waiting ? '兑换中...' : buttonMessageArray[0] }}
            </button>
          </div>
        </div>
        <div class="card xg-swap-info" :class="{ active: willShowInfo }">
          <div v-if="!infoMinOrMax" class="row">
            <div class="col"> 最少收到 </div>
            <div class="col text-right"> {{ infoMinOrMaxAmount }} {{ toTokenName }} </div>
          </div>
          <div v-if="infoMinOrMax" class="row">
            <div class="col"> 最多付出 </div>
            <div class="col text-right"> {{ infoMinOrMaxAmount }} {{ fromTokenName }} </div>
          </div>
          <div class="row">
            <div class="col"> 价格变化 </div>
            <div
              class="col text-right"
              :class="{ 'text-success': infoPriceImpact < 1, 'text-danger': infoPriceImpact > 2 }"
            >
              {{ infoPriceImpact == 0 ? '<0.01' : infoPriceImpact }}%
            </div>
          </div>
          <div class="row">
            <div class="col"> 手续费用 </div>
            <div class="col text-right"> {{ infoFee }} {{ fromTokenName }} </div>
          </div>
          <div class="row">
            <div class="col"> 交易路径 </div>
            <div class="col text-right">
              {{ infoPath }}
            </div>
          </div>
          <div v-if="fromPrice" class="row">
            <div class="col"> {{ fromTokenName }}价格 </div>
            <div class="col text-right"> ${{ fromPrice }} </div>
          </div>
          <div v-if="toPrice" class="row">
            <div class="col"> {{ toTokenName }}价格 </div>
            <div class="col text-right"> ${{ toPrice }} </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <app-token-selection
      #tokenSelection
      style="height: 100%; width: 100%; z-index: 4; position: fixed; top: 0"
      *ngIf="willShowTokenSelection"
      [profile]="profile"
      (onSelect)="onTokenSelection($event)"
  (onClose)="onCloseTokenSelection()">
    </app-token-selection>

    <app-slippage
      #slippage
      style="height: 100%; width: 100%; z-index: 4; position: fixed; top: 0"
      *ngIf="willShowSlippage"
      (onSelect)="onSlippage($event)"
      (onClose)="onCloseSlippage()"
    >
    </app-slippage>

    <app-alert-message
      #alertMessage
      [titleCN]="alertTitleCN"
      [titleEN]="alertTitleEN"
      [bodyCN]="alertBodyCN"
      [bodyEN]="alertBodyEN"
      style="height: 100%; width: 100%; z-index: 14; position: absolute; top: 0"
      *ngIf="willShowAlertMessage"
  (onClose)="closeAlert()">
    </app-alert-message> -->
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { BigNumber } from 'bignumber.js';
  import { environment } from '~/utils/iostConfig';

  import { ContractService } from '~/utils/contractServe';
  import { SwapManager } from '~/utils/swapManager';
  import { TokenManager } from '~/utils/tokenManager';
  export default defineComponent({
    name: 'Swap',
    setup() {
      const ROUND_DOWN = 1;
      onMounted(() => {
        // connectWith(connectors[0]);
      });
      const waiting = ref(false);
      const profile = ref<Record<string, any>>({});
      const swapManager = ref(null);
      const tokenManager = ref(null);
      const willShowTokenSelection = ref(false);
      const tokenSelectionIndex = ref(0);
      const willDisable = ref(false);
      const buttonMessageArray = ref<string[]>([]);
      const willShowSlippage = ref(false);
      const willShowInfo = ref(false);
      const infoMinOrMax = ref(false);
      const infoMinOrMaxAmount = ref(0);
      const infoPriceImpact = ref(0);
      const infoPath = ref('');
      const infoPathArray = ref([]);
      const infoFee = ref('');
      const workingOnOut = ref(false);
      const fromTokenName = ref('iost');
      const fromTokenImage = ref('iost');
      const fromBalance = ref(0);
      const fromPrice = ref(0);
      const toTokenName = ref('---');
      const toTokenImage = ref('_');
      const toBalance = ref(0);
      const toPrice = ref(0);
      const slippageValue = ref(10);
      const amountIn = ref('');
      const amountInOld = ref('');
      const amountOut = ref('');
      const amountOutOld = ref('');
      const ratioValue = ref(0);
      const ratioDirection = ref(false);
      const isMobile = ref(false);
      const willShowAlertMessage = ref(false);
      const alertTitleCN = ref('');
      const alertTitleEN = ref('');
      const alertBodyCN = ref('');
      const alertBodyEN = ref('');
      const interval = ref<number | null>(null);

      // const ngOnInit = async () => {
      //   const myIOST = ContractService.getIOST();
      //   console.log('myIOST---', myIOST);
      //   await TokenManager.constructor(myIOST);
      //   await SwapManager.constructor(myIOST);
      //   buttonMessageArray.value = ['请输入兑换额'];
      //   loadInitialBalance();

      //   const slippageValueNew = parseInt(localStorage.getItem('-xg-slippage'));
      //   if ([1, 5, 10, 50, 100].indexOf(slippageValueNew) >= 0) {
      //     slippageValue.value = slippageValueNew;
      //   }

      //   interval.value = setInterval(() => {
      //     _refresh();
      //   }, 10 * 1e3);

      //   isMobile.value = _isMobile();
      // };

      // const ngOnDestroy = () => {
      //   clearInterval(interval.value);
      // };

      const _isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      };

      const loadInitialBalance = async () => {
        const balance = +new BigNumber(
          await TokenManager.getTokenBalance(fromTokenName.value),
        ).toFixed(6, ROUND_DOWN);
        fromBalance.value = balance;
      };

      const showTokenSelection = (index: number) => {
        willShowTokenSelection.value = true;
        tokenSelectionIndex.value = index;
      };

      const _refresh = () => {
        if (waiting.value) return;
        if (workingOnOut.value) {
          _showOut();
        } else {
          _showIn();
        }
      };

      const onTokenSelection = async ($event: any) => {
        willShowTokenSelection.value = false;

        const tokenName = $event.tokenName;
        const imageList = await TokenManager.getImageList();

        if (tokenSelectionIndex.value == 0) {
          fromTokenName.value = tokenName;
          fromTokenImage.value = imageList.indexOf(tokenName) >= 0 ? tokenName : '_';

          if (toTokenName.value == fromTokenName.value) {
            toTokenName.value = '---';
            toBalance.value = 0;
          }

          const balance =
            $event.balance ||
            +new BigNumber(await SwapManager.getTokenBalance(tokenName)).toFixed(6, ROUND_DOWN);
          fromBalance.value = balance;
        } else {
          toTokenName.value = tokenName;
          toTokenImage.value = imageList.indexOf(tokenName) >= 0 ? tokenName : '_';

          if (fromTokenName.value == toTokenName.value) {
            fromTokenName.value = '---';
            fromBalance.value = 0;
          }

          const balance =
            $event.balance ||
            +new BigNumber(await SwapManager.getTokenBalance(tokenName)).toFixed(6, ROUND_DOWN);
          toBalance.value = balance;
        }

        _refresh();
      };

      const onCloseTokenSelection = () => {
        willShowTokenSelection.value = false;
      };

      const goMax = () => {
        amountIn.value = fromBalance.value.toString();
        enterInAmount();
      };

      const goReverse = () => {
        const tempName = fromTokenName.value;
        const tempImage = fromTokenImage.value;
        const tempBalance = fromBalance.value;
        const tempAmount = amountIn.value;
        const tempAmountOld = amountInOld.value;

        fromTokenName.value = toTokenName.value;
        fromTokenImage.value = toTokenImage.value;
        fromBalance.value = toBalance.value;
        amountIn.value = amountOut.value;
        amountInOld.value = amountOutOld.value;

        toTokenName.value = tempName;
        toTokenImage.value = tempImage;
        toBalance.value = tempBalance;
        amountOut.value = tempAmount;
        amountOutOld.value = tempAmountOld;

        _refresh();
      };

      const reverseRatio = () => {
        ratioDirection.value = !ratioDirection.value;
        if (ratioDirection.value) {
          ratioValue.value = +(+amountIn.value / +amountOut.value).toPrecision(4);
        } else {
          ratioValue.value = +(+amountOut.value / +amountIn.value).toPrecision(4);
        }
      };
      const showSlippage = () => {
        willShowSlippage.value = true;
      };

      const onSlippage = ($event: any) => {
        slippageValue.value = $event.value;
        willShowSlippage.value = false;
        _refresh();
      };

      const onCloseSlippage = () => {
        willShowSlippage.value = false;
      };

      const _showOut = async () => {
        if (fromTokenName.value === '---' || toTokenName.value === '---') {
          willShowInfo.value = false;
          amountOut.value = '';
          amountOutOld.value = '';
          willDisable.value = true;
          buttonMessageArray.value = ['请选择代币'];
          return;
        }

        if (!amountIn.value || parseFloat(amountIn.value) == 0) {
          willShowInfo.value = false;
          amountOut.value = '';
          amountOutOld.value = '';
          willDisable.value = true;
          buttonMessageArray.value = ['请输入兑换额'];
          return;
        }

        const res = await SwapManager.getAmountOutSmartly(
          amountIn.value,
          slippageValue.value,
          profile.value.allPairs,
          fromTokenName.value,
          toTokenName.value,
        );

        if (!res) {
          // This should not happen.
          willShowInfo.value = false;
          amountOut.value = '';
          amountOutOld.value = '';
          willDisable.value = true;
          buttonMessageArray.value = ['流动性不足'];
          return;
        }

        willShowInfo.value = true;

        amountOut.value = res[0].toString();
        amountOutOld.value = res[0].toString();
        infoMinOrMax.value = false;
        infoMinOrMaxAmount.value = res[1];
        infoPriceImpact.value = res[2];
        infoPath.value = res[3].join(' -> ');
        infoPathArray.value = res[3];
        infoFee.value = (+(parseFloat(amountIn.value) * 0.003).toFixed(6)).toString();

        if (ratioDirection.value) {
          ratioValue.value = +(+amountIn.value / +amountOut.value).toPrecision(4);
        } else {
          ratioValue.value = +(+amountOut.value / +amountIn.value).toPrecision(4);
        }

        if (fromTokenName.value == 'iost') {
          fromPrice.value = profile.value.iostPrice;
          toPrice.value = +((fromPrice.value * +amountIn.value) / +amountOut.value).toPrecision(3);
        } else if (fromTokenName.value == 'xusd') {
          fromPrice.value = profile.value.xusdPrice;
          toPrice.value = +((fromPrice.value * +amountIn.value) / +amountOut.value).toPrecision(3);
        } else if (toTokenName.value == 'iost') {
          toPrice.value = profile.value.iostPrice;
          fromPrice.value = +((toPrice.value * +amountOut.value) / +amountIn.value).toPrecision(3);
        } else if (toTokenName.value == 'xusd') {
          toPrice.value = profile.value.xusdPrice;
          fromPrice.value = +((toPrice.value * +amountOut.value) / +amountIn.value).toPrecision(3);
        } else {
          fromPrice.value = 0;
          toPrice.value = 0;
        }

        if (parseFloat(amountIn.value) > fromBalance.value) {
          willDisable.value = true;
          buttonMessageArray.value = ['余额不足', 'Not enough balance'];
          return;
        }

        willDisable.value = false;
        buttonMessageArray.value = ['兑换', 'Swap'];
      };

      const _showIn = async () => {
        if (fromTokenName.value == '---' || toTokenName.value == '---') {
          willShowInfo.value = false;
          amountIn.value = '';
          amountInOld.value = '';
          willDisable.value = true;
          buttonMessageArray.value = ['请选择代币', 'Select a token'];
          return;
        }

        if (!amountOut.value || parseFloat(amountOut.value) == 0) {
          willShowInfo.value = false;
          amountIn.value = '';
          amountInOld.value = '';
          willDisable.value = true;
          buttonMessageArray.value = ['请输入兑换额', 'Enter an amount'];
          return;
        }

        const res = await SwapManager.getAmountInSmartly(
          amountOut.value,
          slippageValue.value,
          profile.value.allPairs,
          fromTokenName.value,
          toTokenName.value,
        );

        if (!res) {
          // Not enough liquidity.
          willShowInfo.value = false;
          amountIn.value = '';
          amountInOld.value = '';
          willDisable.value = true;
          buttonMessageArray.value = ['流动性不足', 'Not enough liquidity'];
          return;
        }

        willShowInfo.value = true;

        amountIn.value = res[0].toString();
        amountInOld.value = res[0].toString();
        infoMinOrMax.value = true;
        infoMinOrMaxAmount.value = res[1];
        infoPriceImpact.value = res[2];
        infoPath.value = res[3].join(' -> ');
        infoPathArray.value = res[3];
        infoFee.value = (+(parseFloat(amountIn.value) * 0.003).toFixed(6)).toString();

        if (ratioDirection.value) {
          ratioValue.value = +(+amountIn.value / +amountOut.value).toPrecision(4);
        } else {
          ratioValue.value = +(+amountOut.value / +amountIn.value).toPrecision(4);
        }

        if (fromTokenName.value == 'iost') {
          fromPrice.value = profile.value.iostPrice;
          toPrice.value = +((fromPrice.value * +amountIn.value) / +amountOut.value).toPrecision(3);
        } else if (fromTokenName.value == 'xusd') {
          fromPrice.value = profile.value.xusdPrice;
          toPrice.value = +((fromPrice.value * +amountIn.value) / +amountOut.value).toPrecision(3);
        } else if (toTokenName.value == 'iost') {
          toPrice.value = profile.value.iostPrice;
          fromPrice.value = +((toPrice.value * +amountOut.value) / +amountIn.value).toPrecision(3);
        } else if (toTokenName.value == 'xusd') {
          toPrice.value = profile.value.xusdPrice;
          fromPrice.value = +((toPrice.value * +amountOut.value) / +amountIn.value).toPrecision(3);
        } else {
          fromPrice.value = 0;
          toPrice.value = 0;
        }

        if (parseFloat(amountIn.value) > fromBalance.value) {
          willDisable.value = true;
          buttonMessageArray.value = ['余额不足', 'Not enough balance'];
          return;
        }

        willDisable.value = false;
        buttonMessageArray.value = ['兑换', 'Swap'];
      };

      const enterInAmount = async () => {
        workingOnOut.value = true;

        if (isNaN(+amountIn.value)) {
          amountIn.value = amountInOld.value;
          return;
        }

        amountIn.value = amountIn.value.trim();

        if (amountIn.value != amountInOld.value) {
          await _showOut();
        }

        amountInOld.value = amountIn.value;
      };

      const enterOutAmount = async () => {
        workingOnOut.value = false;

        if (isNaN(+amountOut.value)) {
          amountOut.value = amountOutOld.value;
          return;
        }

        amountOut.value = amountOut.value.trim();

        if (amountOut.value != amountOutOld.value) {
          await _showIn();
        }

        amountOutOld.value = amountOut.value;
      };

      const checkAmount = ($event: any) => {
        if (environment.allowedKeycodes.indexOf($event.which) < 0) {
          return false;
        }

        return true;
      };

      const goSwap = async () => {
        if (workingOnOut.value) {
          await swapExactTokensForTokens();
        } else {
          await swapTokensForExactTokens();
        }
      };

      const swapExactTokensForTokens = async () => {
        waiting.value = true;
        try {
          const res = await ContractService.swapExactTokensForTokens(
            +amountIn.value,
            infoMinOrMaxAmount.value,
            infoPathArray.value,
          );

          fromBalance.value = +new BigNumber(
            await SwapManager.getTokenBalance(fromTokenName.value),
          ).toFixed(6, ROUND_DOWN);
          toBalance.value = +new BigNumber(
            await SwapManager.getTokenBalance(toTokenName.value),
          ).toFixed(6, ROUND_DOWN);

          // this.showAlert('兑换成功', 'Transaction Succeeded',
          //    '用' + res[0] + ' ' + infoPathArray.value[0] + '换得了' + res[res.length - 1] + ' ' + infoPathArray.value[infoPathArray.value.length - 1],
          //    'Swapped ' + res[0] + ' ' + infoPathArray.value[0] + ' for ' + res[res.length - 1] + ' ' + infoPathArray.value[infoPathArray.value.length - 1]);

          amountIn.value = '';
          enterInAmount();
        } catch (err: any) {
          if (err.indexOf('gas not enough') >= 0) {
            // this.showAlert('Gas不足', 'Gas not enough',
            //     '请通过抵押获得更多', 'Please pledge IOST to get more');
          } else if (err.indexOf('pay ram failed') >= 0) {
            // this.showAlert('Ram不足', 'Ram not enough',
            //     '请通过购买获得更多', 'Please buy some with IOST');
          } else {
            // this.showAlert('交易失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          }
        }

        waiting.value = false;
      };

      const swapTokensForExactTokens = async () => {
        waiting.value = true;
        try {
          const res = await ContractService.swapTokensForExactTokens(
            +amountOut.value,
            infoMinOrMaxAmount.value,
            infoPathArray.value,
          );

          fromBalance.value = +new BigNumber(
            await SwapManager.getTokenBalance(fromTokenName.value),
          ).toFixed(6, ROUND_DOWN);
          toBalance.value = +new BigNumber(
            await SwapManager.getTokenBalance(toTokenName.value),
          ).toFixed(6, ROUND_DOWN);

          // this.showAlert('兑换成功', 'Transaction Succeeded',
          //    '用' + res[0] + ' ' + infoPathArray.value[0] + '换得了' + res[res.length - 1] + ' ' + infoPathArray.value[infoPathArray.value.length - 1],
          //    'Swapped ' + res[0] + ' ' + infoPathArray.value[0] + ' for ' + res[res.length - 1] + ' ' + infoPathArray.value[infoPathArray.value.length - 1])

          amountIn.value = '';
          enterInAmount();
        } catch (err: any) {
          if (err.indexOf('gas not enough') >= 0) {
            // this.showAlert('Gas不足', 'Gas not enough',
            //     '请通过抵押获得更多', 'Please pledge IOST to get more');
          } else if (err.indexOf('pay ram failed') >= 0) {
            // this.showAlert('Ram不足', 'Ram not enough',
            //     '请通过购买获得更多', 'Please buy some with IOST');
          } else {
            // this.showAlert('交易失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          }
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

      // closeAlert() {
      //   this.willShowAlertMessage = false;
      // }
      return {
        waiting,
        profile,
        swapManager,
        tokenManager,
        willShowTokenSelection,
        tokenSelectionIndex,
        willDisable,
        buttonMessageArray,
        willShowSlippage,
        willShowInfo,
        infoMinOrMax,
        infoMinOrMaxAmount,
        infoPriceImpact,
        infoPath,
        infoPathArray,
        infoFee,
        workingOnOut,
        fromTokenName,
        fromTokenImage,
        fromBalance,
        fromPrice,
        toTokenName,
        toTokenImage,
        toBalance,
        toPrice,
        slippageValue,
        amountIn,
        amountInOld,
        amountOut,
        amountOutOld,
        ratioValue,
        ratioDirection,
        isMobile,
        willShowAlertMessage,
        alertTitleCN,
        alertTitleEN,
        alertBodyCN,
        alertBodyEN,
        interval,
        goMax,
        checkAmount,
        enterOutAmount,
        enterInAmount,
        showTokenSelection,
        goReverse,
        reverseRatio,
        showSlippage,
        goSwap,
      };
    },
    computed: {},
    methods: {},
  });
</script>
<style lang="less" scoped>
  .xg-swap {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    max-width: 90%;
  }

  .xg-swap-container {
    padding: 20px;
    width: 400px;
    max-width: 100%;
    transition: 1s;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    user-drag: none;
    -webkit-user-drag: none;
  }

  .xg-swap-pannel {
    border: none;
    padding: 12px 30px;
  }

  .xg-swap-pannel .row .col {
    padding-right: 4px;
    padding-left: 4px;
  }

  .xg-swap-pannel .row .col input {
    height: auto;
    background-color: #3a3f44;
    border-color: #3a3f44;
    color: white;
    padding: 0;
  }

  .xg-swap-reverse {
    margin: 4px;
  }

  .xg-swap-reverse span {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
  }

  .xg-swap-reverse span:hover {
    color: white;
  }

  .xg-swap-info {
    position: relative;
    top: -104px;
    width: 380px;
    max-width: 90%;
    margin: auto;
    padding: 24px 20px 20px 20px;
    background-color: #22282e;
    border: 0;
    z-index: -1;
    visibility: hidden;
    transition: transform 1s;
  }

  .xg-swap-info.active {
    visibility: visible;
    transform: translate(0px, 100px);
  }
</style>
