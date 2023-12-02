<template>
  <div class="token-container p-10">
    <h3 class="title text-4xl">查看地址的代币余额</h3>
    <div class="search-box input-with-background-image m-auto my-10 flex w-1/2 justify-between">
      <BaseInput
        v-model="searchToken"
        size="large"
        placeholder="Search name or paste address"
        class="w-3/4"
      />
      <img src="/src/assets/img/dis.png" class="mr-15 w-5" />
    </div>
    <p class="font-bold">识别所有操作，包括部署、铸造和交易</p>
    <div class="my-10 flex justify-between">
      <h1 class="mb-5 text-left text-xl font-bold">代币列表</h1>
      <button>部署</button>
    </div>
    <div class="my-10 flex justify-between">
      <BaseTabs :tabs="tabs" :initial-tab="selectedTabIndex" @change="handleTabSelected" />
      <BaseInput
        v-model="searchToken"
        placeholder="搜索"
        background="background"
        border="border"
        class="w-1/5"
      />
    </div>
    <div class="tab-content">
      <!-- 根据选中的tab索引显示内容 -->
      <!-- {{ selectedTabIndex }}
      <div v-if="selectedTabIndex === 0">Tab 1 content</div>
      <div v-if="selectedTabIndex === 1">Tab 2 content</div>
      <div v-if="selectedTabIndex === 2">Tab 3 content</div>
      <div v-if="selectedTabIndex === 3">Tab 4 content</div> -->
      <!-- 添加更多tab内容 -->
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
  import BaseTabs from '~/components/core/Tabs.vue';
  import BaseTable from '~/components/core/Table.vue';
  export default defineComponent({
    name: 'Token',
    components: {
      BaseInput,
      BaseTabs,
      BaseTable,
    },
    setup() {
      onMounted(() => {
        //
      });
      const searchToken = ref('');
      const tabs = ref([
        { label: '全部', content: 'Content for Tab 1' },
        { label: '最新', content: 'Content for Tab 2' },
        { label: '进行中', content: 'Content for Tab 3' },
        { label: '已完成', content: 'Content for Tab 4' },
      ]);
      const selectedTabIndex = ref(0);

      const handleTabSelected = (index: number) => {
        console.log('index---', index);
        // 处理选中事件，例如更新内容或执行其他逻辑
        selectedTabIndex.value = index;
      };
      const tableColumns2 = [
        { key: 'iost', label: '代币' },
        { key: 'status', label: '部署时间' },
        { key: 'from', label: '进程' },
        { key: 'to', label: '持有地址' },
        { key: 'Holders', label: 'Holders' },
        { key: 'actions', label: '操作' }, // Add an actions column
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
        tabs,
        searchToken,
        selectedTabIndex,
        handleTabSelected,
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
  .input-with-background-image {
    /* Set the background image URL */
    background: url('../../assets/img/input.png') no-repeat;
    /* Set background size to cover the input */
    background-size: 100% 100%;
    /* Set the input height and width */
    /* Add padding to make room for text inside the input */
    // height: 80px;
    /* Set border and border-radius for styling */
    /* Set color for text inside the input */
    color: #333;
    /* Remove default input styles */
    outline: none;
  }
  .input-with-background-image::placeholder {
    /* Set color for the placeholder text */
    color: #999;
  }
</style>
