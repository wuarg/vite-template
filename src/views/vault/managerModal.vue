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
      <VaultManager
        :full-name="fullName"
        :token="token"
        :precision="precision"
        :extra="extra"
        :extra-precision="extraPrecision"
        :lock-days="lockDays"
      />
    </Modal>
  </div>
</template>
<script lang="ts">
  import Modal from '~/components/core/Modal.vue';
  import Info from '~/components/core/Info.vue';
  import VaultManager from '~/views/vault/vaultManager.vue';
  import { defineComponent, ref, toRefs, onMounted, watch, SetupContext } from 'vue';
  export default defineComponent({
    name: 'TemplateVue',
    components: {
      Modal,
      Info,
      VaultManager,
    },
    props: {
      willShowVaultManage: {
        type: Boolean,
        default: false,
      },
      profile: {
        type: Object,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        default: () => {},
      },
      fullName: {
        type: String,
        default: '',
      },
      token: {
        type: String,
        default: '',
      },
      precision: {
        type: Number,
        default: 0,
      },
      extra: {
        type: Number,
        default: 0,
      },
      extraPrecision: {
        type: Number,
        default: 0,
      },
      lockDays: {
        type: Number,
        default: 0,
      },
    },
    setup(props, context: SetupContext) {
      // const { token, fullName, precision, extra, extraPrecision, lockDays } = toRefs(props);
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
        // token,
        // fullName,
        // precision,
        // extra,
        // extraPrecision,
        // lockDays,
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
