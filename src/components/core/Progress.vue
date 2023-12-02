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

<style scoped>
  .progress-container {
    width: 100%;
    height: 20px;
    background-color: #f0f0f0;
    margin-bottom: 10px;
  }

  .progress-bar {
    height: 100%;
    background-color: #1890ff;
    transition: width 0.3s ease-in-out;
  }
</style>
