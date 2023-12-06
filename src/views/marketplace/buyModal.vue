<template>
  <div class="deplay p-10">
    <Modal ref="childRef" title="确认" @onHide="onHide">
      <div class="mk-list__col__div mx-auto w-1/2">
        <div class="header flex items-center justify-between p-5">
          <span>IOST</span>
          <span><img src="/src/assets/img/success2.png" class="w-5" /></span>
        </div>
        <div class="tags flex items-center justify-between px-5">
          <span>IOST</span>
          <span>IOST</span>
          <span>IOST</span>
        </div>
        <div class="content py-6">
          <h3 class="yellow">1000</h3>
          <p>
            <span class="green">$ 3.24</span>/
            <span>iosi</span>
          </p>
        </div>
        <div class="buy p-3">
          <div class="text-center">
            <span>#3133234</span>
          </div>
        </div>
      </div>
      <div class="items-cente border-bottom-div flex justify-between py-3">
        <span>价格</span>
        <p><span>2000 iost</span></p>
      </div>
      <div class="border-bottom-div flex items-center justify-between py-3">
        <span>需要支付</span>
        <div>
          <p>2000 iost</p>
          <p class="yellow">$ 25.66</p>
        </div>
      </div>
      <div class="my-10 flex items-center justify-end">
        <BaseButton class="buy-button" variant="text-text"> Cancel </BaseButton>
        <BaseButton class="buy-button buy-button-ok" variant="text-text" @click="handleDeploy()">
          <span class="deploy-span">OK</span>
        </BaseButton>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, SetupContext, watch, handleError } from 'vue';
  import Modal from '~/components/core/Modal.vue';
  import BaseButton from '~/components/core/Button.vue';
  export default defineComponent({
    name: 'Deplay',
    components: {
      Modal,
      BaseButton,
    },
    props: {
      buyVisible: {
        type: Boolean,
      },
    },
    setup(props, context: SetupContext) {
      watch(
        () => props.buyVisible,
        (newValue, oldValue) => {
          console.log('newValue, oldValue---', newValue, oldValue);
          if (newValue === true) {
            callChildMethod();
          }
        },
      );
      const childRef = ref(null);
      const callChildMethod = () => {
        console.log('callChildMethod---', childRef.value);
        if (childRef.value) {
          (childRef.value as any).show();
        }
      };
      const onHide = () => {
        context.emit('onHide');
      };

      onMounted(() => {
        //
      });

      const amountIn = ref('');
      const waiting = ref(false);
      const checkAmount = ($event: any) => {
        // if (environment.allowedKeycodes.indexOf($event.which) < 0) {
        //   return false;
        // }
        return true;
      };
      const enterFromAmount = async () => {
        // if (isNaN(+amountIn.value)) {
        //   amountIn.value = amountInOld.value;
        //   return;
        // }
        amountIn.value = amountIn.value.trim();
      };
      const handleDeploy = async () => {
        console.log('amountIn.value--', amountIn.value);
      };

      return {
        childRef,
        onHide,
        waiting,
        amountIn,
        checkAmount,
        enterFromAmount,
        handleDeploy,
      };
    },
    computed: {},
  });
</script>
<style lang="less" scoped>
  @import '~/style/variables.less';
  .label-span {
    font-weight: bold;
    color: #ffe850;
  }
  .form-input {
    background: #c5afff;
    padding: 10px;
  }
  .buy-button {
    background: url('../../assets/img/button.png') no-repeat !important;
    background-size: 100% 100% !important;
    display: inline-block;
    width: 200px;
    height: 60px;
    color: #333;
  }
  .buy-button-ok {
    background: url('../../assets/img/button-ok.png') no-repeat !important;
    background-size: 100% 100% !important;
    display: inline-block;
    width: 200px;
    height: 60px;
    color: #333;
  }
  // .deploy-span{
  //   display: inline-block;
  //   width: 100%;
  //   height: 100%;
  //   background: #15DD16;
  // }
  .mk-list__col__div {
    // width: 100%;
    // max-width: 600px;
    // border: 1px solid @lightSecondaryBackground;
    border-radius: 20px;
    // background-color: @lightBackground;
    overflow: hidden;
    background: url('../../assets/img/mint-modal1.png') no-repeat;
    background-size: 100% 100%;
    .buy {
      background: @purple2;
    }
    .yellow {
      color: @yellow;
    }
    .green {
      color: @green;
    }
  }
  .border-bottom-div {
    border-bottom: 1px solid #fff;
  }
</style>
