<template>
  <div class="walletConnect">
    <Modal ref="childRef" title="WalletConnect" max-width="300px" @onHide="onHide">
      <div class="iWallet my-3 flex items-center">
        <img src="/src/assets/img/iwallet.png" class="mr-5 w-10" />
        <span>iWallet</span>
      </div>
      <div class="TokenPocket my-3 flex items-center">
        <img src="/src/assets/img/tp.png" class="mr-5 w-10" />
        <span>TokenPocket</span>
      </div>
      <div class="my-3 flex items-center">
        <BaseButton
          class="bg-button"
          variant="text-text"
          style="height: 50px; width: auto; margin: auto"
        >
          获取钱包
        </BaseButton>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, SetupContext, watch, inject } from 'vue';
  import Modal from '~/components/core/Modal.vue';
  import BaseButton from '~/components/core/Button.vue';
  export default defineComponent({
    name: 'WalletConnect',
    components: {
      Modal,
      BaseButton,
    },
    props: {
      walletVisible: {
        type: Boolean,
      },
    },
    setup(props, context: SetupContext) {
      watch(
        () => props.walletVisible,
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
        // connectWith(connectors[0]);
      });
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
        context.emit('handleClose');
        // if (childRef.value) {
        //   (childRef.value as any).hide();
        // }
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
