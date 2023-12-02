<!-- src/components/Progress.vue -->
<template>
  <div class="progress-container">
    <div class="progress-bar" :style="{ width: `${percentage}%` }"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    name: 'BaseProgress',
    props: {
      percentage: {
        type: Number as PropType<number>,
        required: true,
      },
    },
  });
</script>

<style lang="less" scoped>
  @import '~/style/variables.less';
  .progress-container {
    height: 10px;
    background-color: #f0f0f0;
    border-radius: 10px;
  }
  .progress-bar {
    height: 100%;
    border-radius: 10px;
    background-color: @success;
    transition: width 0.3s ease-in-out;
  }
</style>
