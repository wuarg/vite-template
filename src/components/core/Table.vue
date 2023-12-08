<!-- src/components/Table.vue -->
<template>
  <div class="table-container">
    <table class="w-full">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key" class="py-3 font-black sm:text-lg">
            <slot name="header" :column="column">{{ column.label }}</slot>
          </th>
          <!-- <th v-if="hasActions">Actions</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex">
          <!-- <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="py-3">
            <slot name="cell" :cell="cell" :column="columns[cellIndex]">{{ cell }}</slot>
          </td> -->
          <td v-for="(column, colIndex) in columns" :key="colIndex" class="py-3">
            <slot name="column" v-bind="{ row, column }">
              {{ row[column.key] }}
            </slot>
          </td>
          <td v-if="hasActions" class="py-3">
            <!-- Custom slot for actions -->
            <slot name="actions" :row="row"></slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="pagination" class="pagination flex items-center justify-center p-10">
      <button :disabled="currentPage === 1" @click="previousPage">
        <img src="/src/assets/img/left.png" class="m-auto w-1/2" />
      </button>
      <span class="mx-3">
        <a
          v-for="page in visiblePageOptions"
          :key="page"
          :class="{ selected: page === currentPage }"
          @click="gotoPage(page)"
        >
          {{ page }}
        </a>
      </span>
      <button :disabled="currentPage === totalPages" @click="nextPage">
        <img src="/src/assets/img/right.png" class="m-auto w-1/2" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, defineProps } from 'vue';

  const props = defineProps(['columns', 'data', 'pagination']); // Accept columns and data as props

  const itemsPerPage = 10;
  const currentPage = ref(1);

  const paginatedData = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return props.data.slice(startIndex, endIndex);
  });

  const totalPages = computed(() => Math.ceil(props.data.length / itemsPerPage));

  const totalPageOptions = computed(() =>
    Array.from({ length: totalPages.value }, (_, index) => index + 1),
  );

  const visiblePageOptions = computed(() => {
    const visiblePages = [];
    const totalVisiblePages = 5; // You can adjust this based on your design
    let startPage = Math.max(1, currentPage.value - Math.floor(totalVisiblePages / 2));
    let endPage = startPage + totalVisiblePages - 1;

    if (endPage > totalPages.value) {
      endPage = totalPages.value;
      startPage = Math.max(1, endPage - totalVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  });

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

  const gotoPage = (page: any) => {
    currentPage.value = page;
  };

  const hasActions = computed(() => props.columns.some((column: any) => column.key === 'actions'));
</script>
