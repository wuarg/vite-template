<template>
  <div class="home-container">
    <BaseMint />
    <div class="last-tx mx-auto w-3/4">
      <h1 class="mb-5 text-left text-xl font-bold">最新交易</h1>
      <BaseTable :headers="tableHeaders" :data="tableData" />
    </div>
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
      const tableHeaders = ['销售(24小时)', '销售额(24小时)', '总销售', '总销售额']; // Example headers
      const tableData = [
        ['100', '20000 IOST', '1000', '100000 IOST'],
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
<style lang="less" scoped>
  @import '~/style/variables.less';
  h1 {
    color: @success;
    font-weight: bold;
  }
</style>
