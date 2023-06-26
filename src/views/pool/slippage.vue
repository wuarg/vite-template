<template>
  <div class="p-10">
    <Modal ref="childRef" title="滑点" @onHide="onHide">
      <div class="xg-slippage">
        <div class="card xg-slippage-outerbox">
          <div>
            <span
              class="xg-slippage-selection"
              :class="{ active: slippageValue === 1 }"
              @click="select(1)"
              >0.1%</span
            >
            <span
              class="xg-slippage-selection"
              :class="{ active: slippageValue === 5 }"
              @click="select(5)"
              >0.5%</span
            >
            <span
              class="xg-slippage-selection"
              :class="{ active: slippageValue === 10 }"
              @click="select(10)"
              >1%</span
            >
            <span
              class="xg-slippage-selection"
              :class="{ active: slippageValue === 50 }"
              @click="select(50)"
              >5%</span
            >
            <span
              class="xg-slippage-selection"
              :class="{ active: slippageValue === 100 }"
              @click="select(100)"
              >10%</span
            >
          </div>
          <div v-if="slippageValue < 5">
            <span>滑点太低，可能导致交易失败</span>
          </div>
          <div>
            <button class="btn btn-sm btn-light" style="margin: 5px" @click="confirm()"
              >确定</button
            >
            <button class="btn btn-sm btn-dark" style="margin: 5px" @click="close()">取消</button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, SetupContext, watch } from 'vue';
  import { commonStore } from '~/stores/modules/common';
  import { environment } from '~/utils/iostConfig';
  import { ContractService } from '~/utils/contractServe';
  import { SwapManager } from '~/utils/swapManager';
  export default defineComponent({
    name: 'SlippageVue',
    props: {
      willShowSlippage: {
        type: Boolean,
      },
    },
    setup(props, context: SetupContext) {
      watch(
        () => props.willShowSlippage,
        (newValue, oldValue) => {
          console.log('newValue, oldValue---', newValue, oldValue);
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
      const slippageValue = ref(10);

      onMounted(() => {
        load();
      });
      const load = async () => {
        waiting.value = true;
        await SwapManager.constructor(myIOST);
        if (walletReady && account) {
          try {
            // 发起第一个异步请求
            const valueType = parseInt(localStorage.getItem('-xg-slippage'));
            if ([1, 5, 10, 50, 100].indexOf(valueType) >= 0) {
              slippageValue.value = valueType;
            }
          } catch (error) {
            console.error(error);
          }
          waiting.value = false;
        } else {
          console.log('未连接钱包');
        }
      };
      const select = (value: number) => {
        slippageValue.value = value;
        localStorage.setItem('-xg-slippage', value.toString());
      };

      const confirm = () => {
        // this.onSelect.emit({
        //   value: this.value,
        // });
        context.emit('onSelect', { value: slippageValue.value });
      };

      const close = () => {
        // this.onClose.emit();
        context.emit('onClose');
      };

      return {
        childRef,
        slippageValue,
        confirm,
        close,
        select,
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
