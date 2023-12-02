<!-- src/components/Table.vue -->
<template>
  <div class="table-container">
    <table class="w-full">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index" class="py-3">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="py-3">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination flex items-center justify-center p-10">
      <button :disabled="currentPage === 1" @click="previousPage">
        <img src="/src/assets/img/left.png" class="w-1/2" />
      </button>
      <span class="mx-3">{{ currentPage }} / {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage">
        <img src="/src/assets/img/right.png" class="w-1/2" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, defineProps } from 'vue';

  const props = defineProps(['headers', 'data']); // Accept headers and data as props

  const itemsPerPage = 10;
  const currentPage = ref(1);

  const paginatedData = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return props.data.slice(startIndex, endIndex);
  });

  const totalPages = computed(() => Math.ceil(props.data.length / itemsPerPage));

  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
</script>
