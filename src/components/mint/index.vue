<template>
  <div class="mint-container p-2 sm:p-10 md:p-10 lg:p-10">
    <p class="mt-10 text-base sm:text-xl md:text-3xl lg:text-3xl"
      >The frst inscription platform on IOST</p
    >
    <img src="/src/assets/img/banner.png" class="mb-10 mt-8 inline w-1/3" alt="" />
    <div class="mint-process">
      <p class="mint-process__price">
        <span class="p-20"> IOST Labes</span>
        <span class="p-20"> 价格: 10 I0ST</span>
      </p>
      <div class="mx-auto my-10 w-1/3 text-center">
        <BaseProgress :percentage="progress" />
      </div>
      <BaseButton class="mint-button" variant="text-text" @click="openModal"> MINT </BaseButton>
    </div>
    <Modal ref="childRef" title="">
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
        <BaseButton class="mint-button" variant="text-text"> OK </BaseButton>
      </template>
    </Modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue';
  import BaseProgress from '~/components/core/Progress.vue';
  import BaseButton from '~/components/core/Button.vue';
  import Modal from '~/components/core/Modal.vue';
  export default defineComponent({
    name: 'Mint',
    components: {
      BaseProgress,
      BaseButton,
      Modal,
    },
    setup() {
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

      return {
        childRef,
        progress,
        increaseProgress,
        openModal,
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
