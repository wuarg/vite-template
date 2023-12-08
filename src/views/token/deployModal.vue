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
          v-model="ircName"
          class="form-input w-2/3"
          type="text"
          placeholder="ircName"
          :disabled="waiting"
          @keyup="ircNameTrim()"
          @change="ircNameTrim()"
        />
      </div>
      <div class="my-10 flex items-center justify-between">
        <span class="label-span">Total Supply</span>
        <input
          v-model="ircTotal"
          class="form-input w-2/3"
          type="text"
          placeholder="0.0"
          :disabled="waiting"
        />
      </div>
      <div class="my-10 flex items-center justify-between">
        <span class="label-span">Limit Per Mint</span>
        <input
          v-model="ircLimit"
          class="form-input w-2/3"
          type="text"
          placeholder="0.0"
          :disabled="waiting"
        />
      </div>
      <div class="my-10 flex items-center justify-end">
        <BaseButton class="deploy-button" variant="text-text" @click="handleCancle()">
          Cancel
        </BaseButton>
        <BaseButton class="deploy-button ok-btn" variant="text-text" @click="handleDeploy()">
          <span class="deploy-span">Deploy</span>
        </BaseButton>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, SetupContext, watch, inject } from 'vue';
  import Modal from '~/components/core/Modal.vue';
  import BaseButton from '~/components/core/Button.vue';
  import { environment } from '~/utils/iostConfig';
  import { ContractService } from '~/utils/contractServe';

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
          } else {
            if (childRef.value) {
              (childRef.value as any).hide();
            }
          }
        },
      );
      onMounted(() => {
        //
      });
      // message
      const $customMessage = inject<{
        success: (content: string, duration: number) => void;
        error: (content: string, duration: number) => void;
        warning: (content: string, duration: number) => void;
      }>('$customMessage')!;

      // modal 方法调用
      const childRef = ref(null);
      const callChildMethod = () => {
        console.log('callChildMethod---', childRef.value);
        if (childRef.value) {
          (childRef.value as any).show();
        }
      };
      const onHide = () => {
        console.log('onHide====');
        context.emit('handleCancle');
        // if (childRef.value) {
        //   (childRef.value as any).hide();
        // }
      };

      const waiting = ref(false);

      const ircName = ref('');
      const ircTotal = ref(0);
      const ircLimit = ref(0);
      const ircNameTrim = async () => {
        ircName.value = ircName.value.trim();
      };
      // const handleDeploy = async () => {
      //   console.log('amountIn.value--', ircName.value, ircTotal.value, ircLimit.value);
      //   // onHide();
      //   context.emit('handleDeploy');
      // };
      const handleDeploy = async () => {
        try {
          const res = await ContractService.deployFunc(
            ircName.value,
            ircTotal.value,
            ircLimit.value,
          );
          $customMessage.success('交易成功!  等待区块确认', 1.5);
          context.emit('handleDeploy');
        } catch (err: any) {
          context.emit('handleCancle');
          console.log('err--', err);
          if (err.indexOf('gas not enough') >= 0) {
            $customMessage.error('Gas不足,请通过抵押获得更多', 1.5);
            // this.showAlert('Gas不足', 'Gas not enough',
            //     '请通过抵押获得更多', 'Please pledge IOST to get more');
          } else if (err.indexOf('pay ram failed') >= 0) {
            $customMessage.error('Ram不足,请通过购买获得更多', 1.5);
            // this.showAlert('Ram不足', 'Ram not enough',
            //     '请通过购买获得更多', 'Please buy some with IOST');
          } else {
            // this.showAlert('交易失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          }
        }
      };

      const handleCancle = async () => {
        console.log('handleCancle', ircName.value, ircTotal.value, ircLimit.value);
        // onHide();
        context.emit('handleCancle');
      };

      return {
        childRef,
        onHide,
        waiting,
        ircName,
        ircTotal,
        ircLimit,
        ircNameTrim,
        handleDeploy,
        handleCancle,
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
  .ok-btn {
    background: url('../../assets/img/button-ok.png') no-repeat !important;
    background-size: 100% 100% !important;
  }
  // .deploy-span{
  //   display: inline-block;
  //   width: 100%;
  //   height: 100%;
  //   background: #15DD16;
  // }
</style>
