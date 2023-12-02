<template>
  <div class="home-container">
    <BaseMint />
    <BaseTable :headers="tableHeaders" :data="tableData" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import BaseMint from '~/components/mint/index.vue';
  import BaseTable from '~/components/core/Table.vue';
  export default defineComponent({
    name: 'HomeContainer',
    components: {
      BaseMint,
      BaseTable,
    },
    setup() {
      onMounted(() => {
        // connectWith(connectors[0]);
      });
      const tableHeaders = ['Name', 'Age', 'City']; // Example headers
      const tableData = [
        ['John Doe', '25', 'New York'],
        ['Jane Smith', '30', 'San Francisco'],
        // Add more data as needed
      ];
      return {
        tableHeaders,
        tableData,
      };
    },
    computed: {},
  });
</script>
<style lang="less" scoped></style>
