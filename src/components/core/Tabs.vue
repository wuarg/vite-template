<template>
  <div class="tabs">
    <div class="tab-header">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ 'active-tab': selectedIndex === index }"
        @click="selectTab(index)"
      >
        {{ tab.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps, defineEmits } from 'vue';
  const props = defineProps(['tabs', 'initialTab']);
  const emits = defineEmits(['change', 'update']);

  const selectedIndex = ref(props.initialTab || 0);

  const selectTab = (index: number) => {
    selectedIndex.value = index;
    emits('change', index);
  };
</script>

<style scoped>
  .tabs {
    width: 300px;
  }

  .tab-header {
    display: flex;
    /* border-bottom: 1px solid #ccc; */
  }

  .tab-header div {
    padding: 5px 10px;
    cursor: pointer;
    border: 1px solid #767676;
  }

  .tab-header .active-tab {
    border: 1px solid #8456fc;
    color: #8456fc;
  }
</style>
