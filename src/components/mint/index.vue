<template>
  <div class="mint-container p-10">
    <p class="mt-10 text-3xl">The frst inscription platform on IOST</p>
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
    <Modal ref="mintModalRef" title="Select a token" no-body-padding>
      <template #headerTitle>
        <BaseButton
          class="back-to-select-token-button svg-image-to-white"
          variant="text"
          no-padding
        >
          <img src="" />
        </BaseButton>
        <h3 class="header-title"> Manage </h3>
      </template>
      33333

      <template #footer>
        <BaseButton class="manage-tokens-button" variant="text-primary" block no-padding>
          Manage Token Lists
        </BaseButton>
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
      return {
        progress,
        increaseProgress,
      };
    },
    computed: {},
    methods: {
      openModal() {
        const a = 0;
        console.log(0);
      },
    },
  });
</script>
<style lang="less" scoped>
  .mint-button {
    background: url('../../assets/img/button.png') no-repeat !important;
    background-size: 100% 100% !important;
    display: inline-block;
    width: 200px;
    height: 60px;
    color: #333;
  }
</style>
