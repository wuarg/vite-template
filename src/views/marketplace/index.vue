<template>
  <div class="token-container mx-auto w-11/12 sm:w-3/4">
    <div class="my-10 flex justify-between">
      <h1 class="mb-5 text-left text-xl font-bold">热门代币</h1>
      <!-- <BaseInput
        v-model="searchToken"
        placeholder="搜索"
        background="background"
        border="border"
        class="w-1/5"
      /> -->
      <BaseInputSearch
        v-model="searchValue"
        :default-search-value="defaultSearchValue"
        style="width: 200px"
      />
    </div>
    <div class="tab-content hidden sm:block">
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
        <!-- Custom slot for actions -->
        <template #actions="{ row }">
          <!-- <button @click="handleEdit(row)">Edit</button>
          <button @click="handleDelete(row)">Delete</button> -->
          <img src="/src/assets/img/share.png" class="m-auto w-1/6" @click="handleEdit(row)" />
          <!-- Add more actions as needed -->
        </template>
      </BaseTable>
    </div>
    <div class="mobile-tx mt-10 block sm:hidden">
      <MobileTable :table-data="tableData" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue';
  // import BaseInput from '~/components/core/Input.vue';
  import BaseTable from '~/components/core/Table.vue';
  import BaseInputSearch from '~/components/core/InputSearch.vue';
  import MobileTable from './mobileTable.vue';
  import { useRouter } from 'vue-router';
  import { getMkList, getMkInfo } from '~/api/index';
  export default defineComponent({
    name: 'Token',
    components: {
      // BaseInput,
      BaseTable,
      BaseInputSearch,
      MobileTable,
    },
    setup() {
      onMounted(() => {
        _getMkList();
      });
      const searchToken = ref('');

      const tableColumns = [
        { key: 'tick', label: '集合' },
        { key: 'floorPrice', label: '地板价' },
        // { key: 'from', label: '单价' },
        { key: 'volumeDay', label: '24小时成交量' },
        { key: 'amountDay', label: '24小时销售' },
        { key: '12', label: '市值' },
        { key: 'counts', label: '拥有者' },
        { key: 'volume', label: '总销售额' },
        { key: 'amount', label: '总销售量' },
        { key: 'shell', label: '在售' },
      ];
      const tableData = ref([]);
      const router = useRouter();
      const handleEdit = (row: any) => {
        // Handle edit action
        console.log('Edit', row);
        router.push({ name: 'MarketplaceDetail', query: { id: row.tick } }); // 使用路由的 name 属性进行跳转
      };
      // search 组件
      const searchValue = ref<string>('');
      const defaultSearchValue = 'initial search text';
      //
      const handleDetail = (row: any, column: any) => {
        console.log('row, column---', row, column);
        router.push({ name: 'MarketplaceDetail', query: { id: row.tick } }); // 使用路由的 name 属性进行跳转
      };
      // mk list
      const _getMkList = async () => {
        const { data: res } = await getMkList('IOSI');
        console.log('getMkList---', res);
        tableData.value = [res];
      };
      return {
        searchToken,
        tableColumns,
        tableData,
        handleEdit,
        searchValue,
        defaultSearchValue,
        handleDetail,
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
  .title {
    font-family: REEJI-TaikoMagicGB-Flash, REEJI-TaikoMagicGB-Flash;
    font-weight: bold;
  }
</style>
