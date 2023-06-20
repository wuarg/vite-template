<template>
  <div class="p-10">
    <Modal ref="childRef" title="投票2" @onHide="onHide"> 222 </Modal>
  </div>
</template>
<script lang="ts">
  import Modal from '~/components/core/Modal.vue';
  // import Info from '~/components/core/Info.vue';
  import { defineComponent, ref, onMounted, watch, SetupContext } from 'vue';
  export default defineComponent({
    name: 'TemplateVue',
    components: {
      Modal,
    },
    props: {
      willShowFarmVote2: {
        type: Boolean,
      },
    },
    setup(props, context: SetupContext) {
      watch(
        () => props.willShowFarmVote2,
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
