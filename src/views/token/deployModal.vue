<template>
  <div class="deplay p-10">
    <Modal ref="childRef" title="IRC-100 部署" @onHide="onHide">
      <div class="my-10 flex items-center justify-between">
        <span class="label-span">Protocol</span>
        <span>IRC-100</span>
      </div>
      <div class="my-10 flex items-center justify-between">
        <span class="label-span">Tick</span>
        <input
          v-model="amountIn"
          class="form-input w-2/3"
          type="text"
          placeholder="0.0"
          :disabled="waiting"
          @keydown="checkAmount($event)"
          @keyup="enterFromAmount()"
          @change="enterFromAmount()"
        />
      </div>
      <div class="my-10 flex items-center justify-between">
        <span class="label-span">Total Supply</span>
        <input
          v-model="amountIn"
          class="form-input w-2/3"
          type="text"
          placeholder="0.0"
          :disabled="waiting"
          @keydown="checkAmount($event)"
          @keyup="enterFromAmount()"
          @change="enterFromAmount()"
        />
      </div>
      <div class="my-10 flex items-center justify-between">
        <span class="label-span">Limit Per Mint</span>
        <input
          v-model="amountIn"
          class="form-input w-2/3"
          type="text"
          placeholder="0.0"
          :disabled="waiting"
          @keydown="checkAmount($event)"
          @keyup="enterFromAmount()"
          @change="enterFromAmount()"
        />
      </div>
      <div class="my-10 flex items-center justify-end">
        <BaseButton class="deploy-button" variant="text-text"> Cancel </BaseButton>
        <BaseButton class="deploy-button" variant="text-text" @click="handleDeploy()">
          <span class="deploy-span">Deploy</span>
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
      deplayVisible: {
        type: Boolean,
      },
    },
    setup(props, context: SetupContext) {
      watch(
        () => props.deplayVisible,
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
  .label-span {
    font-weight: bold;
    color: #ffe850;
  }
  .form-input {
    background: #c5afff;
    padding: 10px;
  }
  .deploy-button {
    background: url('../../assets/img/button.png') no-repeat !important;
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
</style>
