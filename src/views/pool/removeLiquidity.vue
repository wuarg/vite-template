<template>
  <div class="p-10">
    <Modal ref="childRef" title="移除流动性" @onHide="onHide">
      <Info>
        By connecting a wallet, you agree to Uniswap Labs’
        <a href="https://uniswap.org/terms-of-service/" target="_blank">Terms of Service</a>
        and acknowledge that you have read and understand the
        <a href="https://uniswap.org/disclaimer/" target="_blank">Uniswap protocol disclaimer</a>.
      </Info>
      222
    </Modal>
  </div>
</template>
<script lang="ts">
  import Modal from '~/components/core/Modal.vue';
  import Info from '~/components/core/Info.vue';
  import { defineComponent, ref, onMounted, watch, SetupContext } from 'vue';
  import { commonStore } from '~/stores/modules/common';
  import { environment } from '~/utils/iostConfig';
  import { ContractService } from '~/utils/contractServe';
  import { SwapManager } from '~/utils/swapManager';
  import { TokenManager } from '~/utils/tokenManager';
  export default defineComponent({
    name: 'TemplateVue',
    components: {
      Modal,
      Info,
    },
    props: {
      willShowAddLiquidity: {
        type: Boolean,
      },
      token0: {
        type: String,
        default: 'iost',
      },
      token1: {
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

      const isMovingSlider = ref(false);
      const slider = ref<Record<string, any>>({});
      const sliderXOffset = ref(0);
      const sliderX = ref(0);
      const sliderValue = ref(0);
      const myShare = ref(0);

      const pair = ref<Record<string, any>>({});

      const amount0 = ref(0);
      const amount1 = ref(0);

      const removeAmount0 = ref(0);
      const removeAmount1 = ref(0);

      const liquidityToRemove = ref(0);

      const ratioValue = ref(0);
      const ratioDirection = ref(false);
      const willShowSlippage = ref(false);
      const slippageValue = ref(10);

      // interval: any = null;
      const buttonMessageArray = ref<Record<string, any>>([]);
      const alertTitleCN = ref('');
      const alertTitleEN = ref('');
      const alertBodyCN = ref('');
      const alertBodyEN = ref('');
      const willShowAlertMessage = ref(false);

      const token0 = ref(props.token0);
      const token1 = ref(props.token1);

      onMounted(() => {
        const slippageValueType = parseInt(localStorage.getItem('-xg-slippage'));
        if ([1, 5, 10, 50, 100].indexOf(slippageValueType) >= 0) {
          slippageValue.value = slippageValueType;
        }

        // this.interval = setInterval(() => {
        //   // Every 10 seconds, load in case reserver changes.
        //   this._load();
        // }, 10 * 1e3);

        load();
      });
      const load = async () => {
        waiting.value = true;
        await SwapManager.constructor(myIOST);
        await TokenManager.constructor(myIOST);
        if (walletReady && account) {
          try {
            // 发起第一个异步请求
            pair.value = await SwapManager.getPair(token0.value, token1.value);
            myShare.value = await TokenManager.getTokenBalance(pair.value.xlp);
            amount0.value = +((pair.value.reserve0 * myShare.value) / pair.value.xlpSupply).toFixed(
              pair.value.precision0,
            );
            amount1.value = +((pair.value.reserve1 * myShare.value) / pair.value.xlpSupply).toFixed(
              pair.value.precision1,
            );
            ratioValue.value = +(pair.value.reserve0 / pair.value.reserve1).toFixed(
              pair.value.precision0,
            );
            _reloadBySliderValue();
          } catch (error) {
            console.error(error);
          }
          waiting.value = false;
        } else {
          console.log('未连接钱包');
        }
      };
      const _reloadBySliderValue = () => {
        removeAmount0.value = +((amount0.value * sliderValue.value) / 100).toFixed(
          pair.value.precision0,
        );
        removeAmount1.value = +((amount1.value * sliderValue.value) / 100).toFixed(
          pair.value.precision1,
        );
        liquidityToRemove.value = Math.min(
          myShare.value,
          +((myShare.value * sliderValue.value) / 100).toFixed(8),
        );
      };

      const _isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      };

      const setSliderValue = (value: number) => {
        if (!pair.value) {
          return;
        }

        sliderX.value = (value / 100) * slider.value.nativeElement.offsetWidth;
        sliderValue.value = value;
        _reloadBySliderValue();
      };

      const onSliderMove = ($event: any) => {
        if (!pair.value) {
          return;
        }

        if (isMovingSlider.value) {
          if ($event.type == 'touchmove' && _isMobile()) {
            sliderX.value = Math.max(
              0,
              Math.min(
                slider.value.nativeElement.offsetWidth,
                $event.touches[0].clientX - sliderXOffset.value,
              ),
            );
            sliderValue.value = Math.round(
              (sliderX.value / slider.value.nativeElement.offsetWidth) * 100,
            );
            _reloadBySliderValue();
          } else if ($event.type == 'mousemove' && !_isMobile()) {
            sliderX.value = Math.max(
              0,
              Math.min(
                slider.value.nativeElement.offsetWidth,
                $event.screenX - sliderXOffset.value,
              ),
            );
            sliderValue.value = Math.round(
              (sliderX.value / slider.value.nativeElement.offsetWidth) * 100,
            );
            _reloadBySliderValue();
          }
        }
      };

      const onSliderMoveStart = ($event: any) => {
        if ($event.type == 'touchstart' && _isMobile()) {
          isMovingSlider.value = true;
          sliderXOffset.value = -sliderX.value + $event.touches[0].clientX;
        } else if ($event.type == 'mousedown' && !_isMobile()) {
          isMovingSlider.value = true;
          sliderXOffset.value = -sliderX.value + $event.screenX;
        }
      };

      const onSliderMoveEnd = ($event: any) => {
        isMovingSlider.value = false;
      };

      const reverseRatio = () => {
        ratioDirection.value = !ratioDirection.value;
        if (ratioDirection.value) {
          ratioValue.value = +(pair.value.reserve1 / pair.value.reserve0).toFixed(
            pair.value.precision1,
          );
        } else {
          ratioValue.value = +(pair.value.reserve0 / pair.value.reserve1).toFixed(
            pair.value.precision0,
          );
        }
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
        await removeLiquidity();
      };

      const cancel = () => {
        // this.onClose.emit();
        context.emit('onClose');
      };

      const removeLiquidity = async () => {
        waiting.value = true;
        try {
          const res = await ContractService.removeLiquidity(
            token0.value,
            token1.value,
            pair.value.xlp,
            liquidityToRemove.value,
            +(removeAmount0.value * (1 - slippageValue.value / 1000)).toFixed(
              pair.value.precision0,
            ),
            +(removeAmount1.value * (1 - slippageValue.value / 1000)).toFixed(
              pair.value.precision1,
            ),
          );

          // this.onRemove.emit({
          //   value: sliderValue.value
          // });
          context.emit('onRemove', { value: sliderValue.value });
        } catch (err) {
          // if (err.indexOf('gas not enough') >= 0) {
          //   this.showAlert('Gas不足', 'Gas not enough',
          //       '请通过抵押获得更多', 'Please pledge IOST to get more');
          // } else if (err.indexOf('pay ram failed') >= 0) {
          //   this.showAlert('Ram不足', 'Ram not enough',
          //       '请通过购买获得更多', 'Please buy some with IOST');
          // } else if (err.indexOf('Xigua: no pair') >= 0) {
          //   this.showAlert('去除失败', 'Transaction Failed', '该交易对不存在', 'The pair doesn\'t exit')
          // } else {
          //   this.showAlert('去除失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          // }
        }

        waiting.value = false;
      };
      return {
        childRef,
        onHide,
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
