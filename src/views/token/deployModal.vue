<template>
  <div class="deplay p-10">
    <Modal ref="childRef" title="部署" @onHide="onHide"> 333 </Modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, SetupContext, watch } from 'vue';
  import Modal from '~/components/core/Modal.vue';
  export default defineComponent({
    name: 'Deplay',
    components: {
      Modal,
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

      return {
        childRef,
        onHide,
      };
    },
    computed: {},
  });
</script>
<style lang="less" scoped></style>
