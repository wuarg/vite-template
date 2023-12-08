<template>
  <div class="mint-container p-2 sm:p-10">
    <p class="mt-5 text-base sm:mt-10 sm:text-xl md:text-3xl lg:text-3xl"
      >The frst inscription platform on IOST</p
    >
    <img src="/src/assets/img/banner.png" class="mb-5 inline sm:mb-10 sm:mt-8 sm:w-1/3" alt="" />
    <div class="mint-process">
      <p class="mint-process__price">
        <span class="sm:p-20"> IOST Labes</span>
        <span class="sm:p-20"> 价格: 10 I0ST</span>
      </p>
      <div class="mx-auto my-5 text-center sm:my-10 sm:w-1/3">
        <BaseProgress :percentage="progress" />
      </div>
      <BaseButton class="mint-button" variant="text-text" @click="openModal"> MINT </BaseButton>
    </div>
    <Modal ref="childRef" title="" @onHide="onHide">
      <template #headerTitle>
        <h3 class="header-title"> IOST 铭文 </h3>
      </template>
      <div class="mint-info">
        <div class="mint-info-item mb-5 flex justify-between">
          <span>协议类型</span>
          <span>IRC-100</span>
        </div>
        <div class="mint-info-item mb-5 flex justify-between">
          <span>名字</span>
          <span>IOST</span>
        </div>
        <div class="mint-info-item mb-5 flex justify-between">
          <span>总量</span>
          <span>21000000</span>
        </div>
        <div class="mint-info-item flex justify-between">
          <span>数量</span>
          <span>1000</span>
        </div>
      </div>
      <div class="mint-tip flex pt-5">
        <img src="/src/assets/img/tip.png" alt="" class="h-6 w-6" />
        <p>在Mint过程中，每张铭文将消耗10OST至黑洞地址</p>
      </div>
      <template #footer>
        <BaseButton class="mint-button" variant="text-text" @click="handleMint"> OK </BaseButton>
      </template>
    </Modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, getCurrentInstance, inject, SetupContext } from 'vue';
  import BaseProgress from '~/components/core/Progress.vue';
  import BaseButton from '~/components/core/Button.vue';
  import Modal from '~/components/core/Modal.vue';
  import { environment } from '~/utils/iostConfig';
  import { ContractService } from '~/utils/contractServe';
  export default defineComponent({
    name: 'Mint',
    components: {
      BaseProgress,
      BaseButton,
      Modal,
    },
    setup(props, context: SetupContext) {
      onMounted(() => {
        //
      });
      const progress = ref(50);
      const increaseProgress = () => {
        if (progress.value < 100) {
          progress.value += 10;
        }
      };
      const childRef = ref(null);
      const openModal = () => {
        if (childRef.value) {
          (childRef.value as any).show();
        }
      };
      const onHide = () => {
        if (childRef.value) {
          (childRef.value as any).hide();
        }
      };

      const $customMessage = inject<{
        success: (content: string, duration: number) => void;
        error: (content: string, duration: number) => void;
        warning: (content: string, duration: number) => void;
      }>('$customMessage')!;

      const handleMint = async () => {
        try {
          const res = await ContractService.mintFunc('test', 1000);
          console.log('handleMint----', res);
          $customMessage.success('交易成功!  等待区块确认', 1.5);
          onHide();
        } catch (err: any) {
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
            $customMessage.error('交易失败,请再次尝试', 1.5);
            // this.showAlert('交易失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          }
        }
      };

      return {
        childRef,
        progress,
        increaseProgress,
        openModal,
        onHide,
        handleMint,
      };
    },
    computed: {},
  });
</script>
<style lang="less" scoped>
  @import '~/style/variables.less';
  .mint-button {
    background: url('../../assets/img/button.png') no-repeat !important;
    background-size: 100% 100% !important;
    display: inline-block;
    width: 200px;
    height: 60px;
    color: #333;
  }
  .mint-info-item {
    background: #c5afff;
    padding: 10px;
    span {
      font-family: REEJI-TaikoMagicGB-Flash, REEJI-TaikoMagicGB-Flash;
      font-weight: bold;
    }
  }
  .mint-tip {
    p {
      font-family: REEJI-TaikoMagicGB-Flash, REEJI-TaikoMagicGB-Flash;
      color: @success;
      font-weight: bold;
    }
  }
</style>
