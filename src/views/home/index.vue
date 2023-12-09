<template>
  <div class="home-container mx-auto w-11/12 sm:w-3/4">
    <BaseMint />
    <div class="last-tx py-5 sm:py-10">
      <h1 class="mb-5 text-left text-xl font-bold">最新交易</h1>
      <div class="last-info flex items-center justify-between">
        <div class="last-info__div">
          <span class="label block py-3 text-sm font-black sm:text-lg">销售(24小时)</span>
          <span class="value block py-3">{{ lastInfo.volumeDay }}</span>
        </div>
        <div class="last-info__div">
          <span class="label block py-3 text-sm font-black sm:text-lg">销售额(24小时)</span>
          <span class="value block py-3">{{ lastInfo.amountDay }}</span>
        </div>
        <div class="last-info__div">
          <span class="label block py-3 text-sm font-black sm:text-lg">总销售</span>
          <span class="value block py-3">{{ lastInfo.volume }}</span>
        </div>
        <div class="last-info__div">
          <span class="label block py-3 text-sm font-black sm:text-lg">总销售额</span>
          <span class="value block py-3">{{ lastInfo.amount }}</span>
        </div>
      </div>
    </div>
    <div class="my-5 flex justify-between sm:my-10">
      <span>发现超过100笔交易</span>
      <!-- <select v-model="currentSelect" style="color: #333" @change="handleSelectChange">
        <option v-for="option in selectOptions" :key="option.key" :value="option.key">{{
          option.label
        }}</option>
      </select> -->
      <BaseSelect
        v-model:value="selectedValue"
        :default-value="defaultSelectedValue"
        style="width: 200px"
        @change="handleSelectChange"
      >
        <!-- 这里是 MySelect 的插槽内容 -->
        <a-select-option v-for="(item, index) in selectOptions" :key="index" :value="item.key">
          {{ item.label }}
        </a-select-option>
      </BaseSelect>
    </div>
    <div class="all-tx hidden sm:block">
      <BaseTable :columns="tableColumns2" :data="activeListData" :pagination="true">
        <!-- Slot for customizing header cells -->
        <template #header="{ column }">
          <strong>{{ column.label }}</strong>
        </template>

        <!-- Slot for customizing body cells -->
        <template #column="{ row, column }">
          <!-- Custom column content -->
          <span v-if="column.key === 'iost'">
            {{ row[column.key] + ' - Custom Content' }}
          </span>
          <span v-else>
            {{ row[column.key] }}
          </span>
        </template>
        <!-- Custom slot for actions -->
        <template #actions="{ row }">
          <img src="/src/assets/img/share.png" class="m-auto w-1/5" @click="handleToTx(row)" />
          <!-- Add more actions as needed -->
        </template>
      </BaseTable>
    </div>
    <div class="all-tx block sm:hidden">
      <TableList />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import BaseMint from '~/components/mint/index.vue';
  import BaseTable from '~/components/core/Table.vue';
  import BaseSelect from '~/components/core/Select.vue';
  import TableList from './tableList.vue';
  import { getLastTransaction, getLastTransactionList } from '~/api/index';
  export default defineComponent({
    name: 'HomeContainer',
    components: {
      BaseMint,
      BaseTable,
      BaseSelect,
      TableList,
    },
    setup() {
      onMounted(() => {
        // connectWith(connectors[0]);
        _getLastTransaction();
        // _getLastTransactionList({ tick: 'IOSI', page: 1, take: 100 });
      });
      const tableColumns = [
        { key: 'volumeDay', label: '销售(24小时)' },
        { key: 'amountDay', label: '销售额(24小时)' },
        { key: 'volume', label: '总销售' },
        { key: 'amount', label: '总销售额' },
        // Add more columns as needed
      ];
      const lastInfo = ref({
        volumeDay: 0,
        amountDay: 0,
        volume: 0,
        amount: 0,
      });

      const tableColumns2 = [
        { key: 'tick', label: 'IOST 铭文' },
        { key: 'op', label: '状态' },
        { key: 'from', label: '从' },
        { key: 'to', label: '到' },
        { key: 'price', label: '金额' },
        { key: 'blockTime', label: '时间' },
        { key: 'actions', label: '操作' }, // Add an actions column
      ];
      const activeListData = ref([]);
      const currentSelect = ref<string>('1');
      const selectOptions = [
        { key: 1, label: '所有' },
        { key: 2, label: '销售' },
        { key: 3, label: '转帐' },
      ];
      const handleToTx = (row: any) => {
        // Handle edit action
        const url = 'https://www.iostabc.com/tx/' + row.transactionHash;
        // Open a new window with the specified URL
        window.open(url, '_blank');
      };

      const handleDelete = (row: any) => {
        // Handle delete action
        console.log('Delete', row);
      };
      //select 组件
      const selectedValue = ref<string | number | null>(null);
      const defaultSelectedValue = '2';
      const handleSelectChange = (value: any) => {
        console.log('Selected value:', value);
      };

      // 获取最新交易
      const _getLastTransaction = async () => {
        const res = await getLastTransaction('IOSI');
        console.log('res--222-', res);
        lastInfo.value = res.data;
        _getLastTransactionList({ tick: 'IOSI', page: 1, take: 100 });
      };
      // 列表 getLastTransactionList
      const _getLastTransactionList = async (params: object) => {
        const { data: res } = await getLastTransactionList(params);
        console.log('_getLastTransactionList---', res.nodes);
        activeListData.value = res.nodes;
      };
      return {
        tableColumns,
        lastInfo,
        tableColumns2,
        activeListData,
        selectOptions,
        currentSelect,
        handleToTx,
        handleDelete,
        handleSelectChange,
        selectedValue,
        defaultSelectedValue,
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
  .last-info__div {
    .label {
    }
  }
</style>
