<template>
  <div class="home-container mx-auto w-3/4">
    <BaseMint />
    <div class="last-tx">
      <h1 class="mb-5 text-left text-xl font-bold">最新交易</h1>
      <BaseTable :columns="tableColumns" :data="tableData">
        <!-- Slot for customizing header cells -->
        <template #header="{ column }">
          <strong>{{ column.label }}</strong>
        </template>

        <!-- Slot for customizing body cells -->
        <template #cell="{ cell }"> {{ cell }} </template>
      </BaseTable>
    </div>
    <div class="mb-5 flex justify-between">
      <span>发现超过100笔交易</span>
      <span>下拉</span>
    </div>
    <div class="all-tx">
      <BaseTable :columns="tableColumns2" :data="tableData2">
        <!-- Slot for customizing header cells -->
        <template #header="{ column }">
          <strong>{{ column.label }}</strong>
        </template>

        <!-- Slot for customizing body cells -->
        <template #cell="{ cell }"> {{ cell }}</template>
        <!-- Custom slot for actions -->
        <template #actions="{ row }">
          <button @click="handleEdit(row)">Edit</button>
          <button @click="handleDelete(row)">Delete</button>
          <!-- Add more actions as needed -->
        </template>
      </BaseTable>
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
      const tableColumns = [
        { key: 'name', label: '销售(24小时)' },
        { key: 'age', label: '销售额(24小时)' },
        { key: 'city', label: '总销售' },
        { key: 'city2', label: '总销售额' },
        // Add more columns as needed
      ];
      const tableData = [
        { name: '100', age: '20000 IOS', city: '1000', city2: '100000 IOST' },
        // Add more data as needed
      ];

      const tableColumns2 = [
        { key: 'iost', label: 'IOST 铭文' },
        { key: 'status', label: '状态' },
        { key: 'from', label: '从' },
        { key: 'to', label: '到' },
        { key: 'amount', label: '金额' },
        { key: 'time', label: '时间' },
        { key: 'actions', label: '操作' }, // Add an actions column
      ];
      const tableData2 = [
        {
          iost: '100',
          status: '20000 IOS',
          from: '1000',
          to: '100000 IOST',
          amount: '211122',
          time: '22231',
        },
        {
          iost: '13300',
          status: '20000 IOS',
          from: '1000',
          to: '100000 IOST',
          amount: '2233332',
          time: '22222',
        },
        // Add more data as needed
      ];
      const handleEdit = (row: any) => {
        // Handle edit action
        console.log('Edit', row);
      };

      const handleDelete = (row: any) => {
        // Handle delete action
        console.log('Delete', row);
      };
      return {
        tableColumns,
        tableData,
        tableColumns2,
        tableData2,
        handleEdit,
        handleDelete,
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
