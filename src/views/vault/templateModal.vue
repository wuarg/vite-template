<template>
  <div class="p-10">
    11
    <Modal ref="childRef" title="管理" @onHide="onHide">
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
  export default defineComponent({
    name: 'TemplateVue',
    components: {
      Modal,
      Info,
    },
    props: {
      willShowVaultManage: {
        type: Boolean,
      },
    },
    setup(props, context: SetupContext) {
      watch(
        () => props.willShowVaultManage,
        (newValue, oldValue) => {
          if (newValue === true) {
            callChildMethod();
          }
        },
      );

      onMounted(() => {
        // connectWith(connectors[0]);
      });

      const childRef = ref(null);
      const callChildMethod = () => {
        if (childRef.value) {
          (childRef.value as any).show();
        }
      };
      const onHide = () => {
        context.emit('onHide');
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
