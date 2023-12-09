<template>
  <div class="token-container mx-auto w-11/12 sm:w-3/4">
    <span class="title text-white block py-5 text-base sm:text-4xl">查看地址的代币余额</span>
    <div
      class="search-box input-with-background-image m-auto my-5 flex items-center sm:my-10 sm:w-1/2"
    >
      <BaseInput
        v-model="searchToken"
        size="large"
        placeholder="Search name or paste address"
        class="hidden w-10/12 sm:block"
      />
      <BaseInput
        v-model="searchToken"
        size="small"
        placeholder="Search name or paste address"
        class="block w-10/12 text-base sm:hidden"
      />
      <img src="/src/assets/img/search.png" class="sm:pl-15 h-5 w-5 sm:h-8 sm:w-8" />
    </div>
    <p class="font-bold">识别所有操作，包括部署、铸造和交易</p>
    <div class="mt-5 flex justify-between sm:my-10">
      <h1 class="text-left text-base font-bold sm:mb-5 sm:text-xl">代币列表</h1>
      <div class="deploy hidden sm:block">
        <a-button type="primary" @click="handleDeplayModal()">部署</a-button>
      </div>
    </div>
    <div class="my-5 flex justify-between sm:my-10">
      <div class="deploy block sm:hidden">
        <a-button type="primary" @click="handleDeplayModal()">部署</a-button>
      </div>
      <BaseTabs
        :tabs="tabs"
        :initial-tab="selectedTabIndex"
        class="hidden sm:block"
        @change="handleTabSelected"
      />
      <BaseInputSearch
        v-model="searchValue"
        :default-search-value="defaultSearchValue"
        style="width: 200px"
      />
    </div>
    <div class="tab-content hidden sm:block">
      <!-- 根据选中的tab索引显示内容 -->
      <!-- {{ selectedTabIndex }}
      <div v-if="selectedTabIndex === 0">Tab 1 content</div>
      <div v-if="selectedTabIndex === 1">Tab 2 content</div>
      <div v-if="selectedTabIndex === 2">Tab 3 content</div>
      <div v-if="selectedTabIndex === 3">Tab 4 content</div> -->
      <!-- 添加更多tab内容 -->
      <BaseTable :columns="tableColumns" :data="tableData" :pagination="true">
        <!-- Slot for customizing header cells -->
        <template #header="{ column }">
          <strong>{{ column.label }}</strong>
        </template>

        <!-- Slot for customizing body cells -->
        <template #column="{ row, column }">
          <!-- Custom column content -->
          <span v-if="column.key === 'progress'">
            {{ (row['counts'] * row['lim']) / row['max'] }} %
          </span>
          <span v-else>
            {{ row[column.key] }}
          </span>
        </template>
        <!-- Custom slot for actions -->
        <template #actions="{ row }">
          <!-- <button @click="handleEdit(row)">Edit</button>
          <button @click="handleDelete(row)">Delete</button> -->
          <img src="/src/assets/img/share.png" class="m-auto w-1/6" @click="navigateToIrc(row)" />
          <!-- Add more actions as needed -->
        </template>
      </BaseTable>
    </div>
    <div class="mobile-tx mt-10 block sm:hidden">
      <BaseTabs
        :tabs="tabs"
        :initial-tab="selectedTabIndex"
        class="flex justify-center"
        @change="handleTabSelected"
      />
      <MobileTable />
    </div>
    <deployModal
      :deplay-visible="deplayVisible"
      @handleDeploy="handleOkDeplay()"
      @handleCancle="handleHideDeplay()"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue';
  import BaseInput from '~/components/core/Input.vue';
  import BaseInputSearch from '~/components/core/InputSearch.vue';
  import BaseTabs from '~/components/core/Tabs.vue';
  import BaseTable from '~/components/core/Table.vue';
  import deployModal from '~/views/token/deployModal.vue';
  import MobileTable from './mobileList.vue';
  import { useRouter } from 'vue-router';
  import { getTokenList, getTokenInfo } from '~/api/index';
  export default defineComponent({
    name: 'Token',
    components: {
      BaseInput,
      BaseTabs,
      BaseTable,
      deployModal,
      BaseInputSearch,
      MobileTable,
    },
    setup() {
      onMounted(() => {
        //
        _getTokenList();
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
      const tableColumns = [
        { key: 'tick', label: '代币' },
        { key: 'blockTime', label: '部署时间' },
        { key: 'progress', label: '进程' },
        // { key: 'to', label: '持有地址' },
        { key: 'holders', label: 'Holders' },
        { key: 'actions', label: '操作' }, // Add an actions column
      ];
      const tableData = ref([]);

      const handleEdit = (row: any) => {
        // Handle edit action
        console.log('Edit', row);
      };

      const deplayVisible = ref(false);
      const handleDeplayModal = () => {
        console.log('2222');
        deplayVisible.value = true;
      };
      const handleOkDeplay = () => {
        console.log('handleOkDeplay');
        deplayVisible.value = false;
      };
      const handleHideDeplay = () => {
        console.log('handleHideDeplay');
        deplayVisible.value = false;
      };
      const router = useRouter();
      const navigateToIrc = (row: any) => {
        console.log('row--', row);
        router.push({ name: 'Irc20Detail', query: { id: row.tick } }); // 使用路由的 name 属性进行跳转
      };

      // search 组件
      const searchValue = ref<string>('');
      const defaultSearchValue = 'initial search text';

      // token list
      const _getTokenList = async () => {
        const { data: res } = await getTokenList();
        console.log('_getTokenList---', res);
        tableData.value = res;
      };
      return {
        tabs,
        searchToken,
        selectedTabIndex,
        handleTabSelected,
        tableColumns,
        tableData,
        handleEdit,
        deplayVisible,
        handleOkDeplay,
        handleHideDeplay,
        handleDeplayModal,
        navigateToIrc,
        searchValue,
        defaultSearchValue,
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
