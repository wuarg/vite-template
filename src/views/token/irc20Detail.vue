<template>
  <div class="irc--container mx-auto w-11/12 sm:w-3/4">
    <div class="my-10 flex items-center">
      <img src="/src/assets/img/back.png" alt="back" class="mr-3 w-5" @click="goBack()" />
      <h1 class="mb-0 text-left text-xl font-bold">代币列表</h1>
    </div>
    <div class="mx-auto my-10 text-center">
      <BaseProgress :percentage="progress" />
    </div>
    <div class="irc-info my-10 p-5">
      <h1 class="mb-5 text-left text-xl font-bold">Overview</h1>
      <div class="my-5 flex justify-between">
        <span class="text-l text-left font-bold">Total Supply</span>
        <span class="text-l text-left font-bold">{{ ircInfo.max }}</span>
      </div>
      <div class="my-5 flex justify-between">
        <span class="text-l text-left font-bold">Minted</span>
        <span class="text-l text-left font-bold">{{ ircInfo.counts }}</span>
      </div>
      <div class="my-5 flex justify-between">
        <span class="text-l text-left font-bold">Limit per mint</span>
        <span class="text-l text-left font-bold">{{ ircInfo.lim }}</span>
      </div>
      <div class="my-5 flex justify-between">
        <span class="text-l text-left font-bold">Deploy By</span>
        <span class="text-l text-left font-bold">{{ ircInfo.deployer }}</span>
      </div>
      <div class="my-5 flex justify-between">
        <span class="text-l text-left font-bold">Deploy Time</span>
        <span class="text-l text-left font-bold">{{ ircInfo.blockTime }}</span>
      </div>
      <div class="my-5 flex justify-between">
        <span class="text-l text-left font-bold">Holders</span>
        <span class="text-l text-left font-bold">{{ ircInfo.holders }}</span>
      </div>
      <div class="my-5 flex justify-between">
        <span class="text-l text-left font-bold">Total Transaction</span>
        <span class="text-l text-left font-bold">--</span>
      </div>
    </div>
    <div class="my-10 flex items-center justify-center">
      <BaseTabs :tabs="tabs" :initial-tab="selectedTabIndex" @change="handleTabSelected" />
    </div>
    <div class="tab-content my-10">
      <!-- 根据选中的tab索引显示内容 -->
      <!-- {{ selectedTabIndex }}
      <div v-if="selectedTabIndex === 0">Tab 1 content</div>
      <div v-if="selectedTabIndex === 1">Tab 2 content</div>
      <div v-if="selectedTabIndex === 2">Tab 3 content</div>
      <div v-if="selectedTabIndex === 3">Tab 4 content</div> -->
      <!-- 添加更多tab内容 -->
      <BaseTable
        :class="selectedTabIndex === 0 ? 'holders-table' : 'transfers-table'"
        :columns="selectedTabIndex === 0 ? holdersTableColumns : transfersTableColumns"
        :data="selectedTabIndex === 0 ? holdersResData : transfersResData"
        :pagination="true"
      >
        <!-- Slot for customizing header cells -->
        <template #header="{ column }">
          <strong>{{ column.label }}</strong>
        </template>

        <!-- Slot for customizing body cells -->
        <template #column="{ row, column }">
          <span v-if="column.key === 'actions'">
            <img src="/src/assets/img/share.png" class="m-auto w-1/6" @click="handleToTx(row)" />
          </span>
          <span v-else>
            {{ row[column.key] }}
          </span>
        </template>
        <!-- Custom slot for actions -->
      </BaseTable>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, watchEffect } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import BaseProgress from '~/components/core/Progress.vue';
  import BaseTabs from '~/components/core/Tabs.vue';
  import BaseTable from '~/components/core/Table.vue';
  import { getTokenList, getTokenInfo, getTokenHolders, getTokenTransfers } from '~/api/index';
  export default defineComponent({
    name: 'IRC20',
    components: {
      BaseProgress,
      BaseTabs,
      BaseTable,
    },
    setup() {
      onMounted(() => {
        // connectWith(connectors[0]);
      });
      const ircInfo = ref({});
      const holdersResData = ref([]);
      const transfersResData = ref([]);
      // 异步请求方法
      const fetchData = async (param: string) => {
        console.log('param---', param);
        try {
          // 发起异步请求，这里可以使用你的请求库（例如 axios）
          const response = await getTokenInfo(param);
          // 处理请求结果，例如更新组件状态
          console.log('response---', response);
          ircInfo.value = response.data;
          const queryParam = {
            tick: param,
            page: 1,
            take: 100,
          };
          const holdersRes = await getTokenHolders(queryParam);
          console.log('holdersRes---', holdersRes.data.nodes);
          holdersResData.value = holdersRes.data.nodes;
          const transfersRes = await getTokenTransfers(queryParam);
          console.log('transfersRes---', transfersRes.data.nodes);
          transfersResData.value = transfersRes.data.nodes;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      // 定义一个响应式变量，存储 query 参数的值
      const queryParam = ref<string | null>(null);
      // 使用路由钩子监听路由变化
      const route = useRoute();

      watchEffect(() => {
        // 在路由变化时更新 queryParam 的值
        queryParam.value = (route.query.id as string) || null;
        console.log('queryParam.value111---', queryParam.value);
        // 在 queryParam 变化时触发请求方法
        if (queryParam.value) {
          // 执行你的请求方法，例如 fetchData 方法
          fetchData(queryParam.value);
        }
      });

      const progress = ref(50);
      const tabs = ref([
        { label: 'Holders', content: 'Content for Tab 1' },
        { label: 'Transfers', content: 'Content for Tab 2' },
      ]);
      const selectedTabIndex = ref(0);
      const handleTabSelected = (index: number) => {
        console.log('index---', index);
        // 处理选中事件，例如更新内容或执行其他逻辑
        selectedTabIndex.value = index;
      };
      const holdersTableColumns = [
        { key: 'id', label: 'Rank' },
        { key: 'owner', label: 'Address' },
        { key: 'percent', label: 'Percentage' },
        { key: 'amount', label: 'Value' },
      ];
      const transfersTableColumns = [
        { key: 'inscriptionId', label: 'Id' },
        { key: 'method', label: 'Method' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'from', label: 'From' },
        { key: 'to', label: 'to' },
        { key: 'blockTime', label: 'Data Time' },
        { key: 'actions', label: 'Action' },
      ];

      const router = useRouter();
      const goBack = () => {
        router.push({ name: 'Tokens' });
      };

      const handleToTx = (row: any) => {
        // Handle edit action
        const url = 'https://www.iostabc.com/tx/' + row.transactionHash;
        // Open a new window with the specified URL
        window.open(url, '_blank');
      };
      return {
        ircInfo,
        progress,
        tabs,
        selectedTabIndex,
        handleTabSelected,
        holdersTableColumns,
        transfersTableColumns,
        holdersResData,
        transfersResData,
        goBack,
        handleToTx,
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
  .irc-info {
    background: #8456fc;
    border-radius: 10px;
    border: 1px solid #ffffff;
  }
</style>
