<template>
  <div class="table-content my-5">
    <BaseTable :columns="tableColumns2" :data="tableData2" :pagination="true">
      <!-- Slot for customizing header cells -->
      <template #header="{ column }">
        <strong>{{ column.label }}</strong>
      </template>

      <!-- Slot for customizing body cells -->
      <template #column="{ row, column }">
        <!-- Custom column content -->
        <span v-if="column.key === 'iost'" @click="handleDetail(row, column)">
          {{ row[column.key] + ' - Custom Content' }}
        </span>
        <span v-else @click="handleDetail(row, column)">
          {{ row[column.key] }}
        </span>
      </template>
      <!-- Custom slot for actions -->
      <template #actions="{ row }">
        <!-- <button @click="handleEdit(row)">Edit</button>
          <button @click="handleDelete(row)">Delete</button> -->
        <img src="/src/assets/img/share.png" class="m-auto w-1/6" @click="handleEdit(row)" />
        <!-- Add more actions as needed -->
      </template>
    </BaseTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import BaseTable from '~/components/core/Table.vue';
  export default defineComponent({
    name: '2333',
    components: {
      BaseTable,
    },
    setup() {
      onMounted(() => {
        // connectWith(connectors[0]);
      });
      const tableColumns2 = [
        { key: 'iost', label: '集合' },
        { key: 'status', label: '低价' },
        { key: 'from', label: '单价' },
        { key: 'to', label: '24小时成交量' },
        { key: 'Holders', label: '24小时销售' },
      ];
      const tableData2 = [
        {
          iost: '100',
          status: '20000 IOS',
          from: '1000',
          to: '100000 IOST',
          Holders: '222',
        },
        {
          iost: '13300',
          status: '20000 IOS',
          from: '1000',
          to: '100000 IOST',
          Holders: '222',
        },
        {
          iost: '13300',
          status: '20000 IOS',
          from: '1000',
          to: '100000 IOST',
          Holders: '222',
        },
        {
          iost: '13300',
          status: '20000 IOS',
          from: '1000',
          to: '100000 IOST',
          Holders: '222',
        },
        {
          iost: '13300',
          status: '20000 IOS',
          from: '1000',
          to: '100000 IOST',
          Holders: '222',
        },
        {
          iost: '13300',
          status: '20000 IOS',
          from: '1000',
          to: '100000 IOST',
          Holders: '222',
        },
        {
          iost: '13300',
          status: '20000 IOS',
          from: '1000',
          to: '100000 IOST',
          Holders: '222',
        },
        // Add more data as needed
      ];
      const router = useRouter();
      const handleEdit = (row: any, column: any) => {
        console.log('row, column---', row, column);
        router.push({ name: 'MarketplaceDetail', query: { id: row.iost } }); // 使用路由的 name 属性进行跳转
      };
      return {
        tableColumns2,
        tableData2,
        handleEdit,
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
