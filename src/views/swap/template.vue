<template>
  <div class="p-10"> swap </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  export default defineComponent({
    name: 'TemplateVue',
    setup() {
      onMounted(() => {
        // connectWith(connectors[0]);
      });
      return {};
    },
    computed: {},
  });
</script>
<style lang="less" scoped>
  .wrap {
    height: 100vh;
  }
</style>
