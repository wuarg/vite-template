<template>
  <div class="table-content my-5">
    <BaseTable :columns="tableColumns" :data="tableData" :pagination="true">
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
    props: {
      tableData: {
        type: Array,
      },
    },
    setup() {
      onMounted(() => {
        // connectWith(connectors[0]);
      });
      const tableColumns = [
        { key: 'tick', label: '集合' },
        { key: 'floorPrice', label: '地板价' },
        // { key: 'from', label: '单价' },
        { key: 'volumeDay', label: '24小时成交量' },
        { key: 'amountDay', label: '24小时销售' },
      ];

      const router = useRouter();
      const handleEdit = (row: any, column: any) => {
        console.log('row, column---', row, column);
        router.push({ name: 'MarketplaceDetail', query: { id: row.tick } }); // 使用路由的 name 属性进行跳转
      };
      const handleDetail = (row: any, column: any) => {
        console.log('row, column---', row, column);
        router.push({ name: 'MarketplaceDetail', query: { id: row.tick } }); // 使用路由的 name 属性进行跳转
      };
      return {
        tableColumns,
        handleDetail,
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
