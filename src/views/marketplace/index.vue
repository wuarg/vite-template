<template>
  <div class="token-container p-10">
    <div class="my-10 flex justify-between">
      <h1 class="mb-5 text-left text-xl font-bold">热门代币</h1>
      <BaseInput
        v-model="searchToken"
        placeholder="搜索"
        background="background"
        border="border"
        class="w-1/5"
      />
    </div>
    <div class="tab-content">
      <BaseTable :columns="tableColumns2" :data="tableData2" :pagination="true">
        <!-- Slot for customizing header cells -->
        <template #header="{ column }">
          <strong>{{ column.label }}</strong>
        </template>

        <!-- Slot for customizing body cells -->
        <template #cell="{ cell }"> {{ cell }}</template>
        <!-- Custom slot for actions -->
        <template #actions="{ row }">
          <!-- <button @click="handleEdit(row)">Edit</button>
          <button @click="handleDelete(row)">Delete</button> -->
          <img src="/src/assets/img/share.png" class="m-auto w-1/6" @click="handleEdit(row)" />
          <!-- Add more actions as needed -->
        </template>
      </BaseTable>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue';
  import BaseInput from '~/components/core/Input.vue';
  import BaseTable from '~/components/core/Table.vue';
  export default defineComponent({
    name: 'Token',
    components: {
      BaseInput,
      BaseTable,
    },
    setup() {
      onMounted(() => {
        //
      });
      const searchToken = ref('');

      const tableColumns2 = [
        { key: 'iost', label: '集合' },
        { key: 'status', label: '低价' },
        { key: 'from', label: '单价' },
        { key: 'to', label: '24小时成交量' },
        { key: 'Holders', label: '24小时销售' },
        { key: '12', label: '市值' },
        { key: '1', label: '拥有者' },
        { key: '123', label: '总销售额' },
        { key: '124', label: '总销售量' },
        { key: '125', label: '在售' },
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
      const handleEdit = (row: any) => {
        // Handle edit action
        console.log('Edit', row);
      };
      return {
        searchToken,
        tableColumns2,
        tableData2,
        handleEdit,
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
