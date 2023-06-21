<template>
  <div class="p-10">
    <Modal ref="childRef" title="添加流动性" @onHide="onHide">
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
      });
      const load = async () => {
        waiting.value = true;
        await SwapManager.constructor(myIOST);
        await TokenManager.constructor(myIOST);
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
