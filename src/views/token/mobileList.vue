<template>
  <div class="table-content my-5">
    <div
      v-for="(item, index) in tableData"
      :key="index"
      class="table-content__div my-3 flex rounded p-2"
      @click="navigateToIrc(item)"
    >
      <div class="left mr-5">
        <img src="/src/assets/img/twitter.png" class="h-8 w-8" />
      </div>
      <div class="right flex-1">
        <div class="right__div flex items-center justify-between py-2">
          <div class="label">
            <p class="mb-2">IRC- 100 </p>
            <p class="mb-0 opacity-50">{{ item.tick }}</p>
          </div>
        </div>
        <!-- <div class="right__div flex items-center justify-between py-2">
          <div class="label">
            <p class="mb-2 opacity-50">Address</p>
          </div>
          <div class="value">
            <span class="num">{{ item.tick }}</span>
          </div>
        </div> -->
        <div class="right__div flex items-center justify-between py-2">
          <div class="label opacity-50">
            <p class="mb-2">Holder</p>
          </div>
          <div class="value">
            <span class="num">{{ item.holders }}</span>
          </div>
        </div>
        <div class="right__div flex items-center justify-between py-2">
          <div class="label opacity-50">
            <p class="mb-0 mr-5">进程</p>
          </div>
          <div class="value flex-1">
            <BaseProgress :percentage="progress" />
          </div>
        </div>
        <div class="right__div flex items-center justify-between py-2">
          <div class="label opacity-50">
            <p class="mb-2">{{ item.blockTime }}</p>
          </div>
          <div class="value">
            <img src="/src/assets/img/share.png" class="w-4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import BaseProgress from '~/components/core/Progress.vue';
  export default defineComponent({
    name: 'TableList',
    components: {
      BaseProgress,
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
      const progress = ref(50);
      const increaseProgress = () => {
        if (progress.value < 100) {
          progress.value += 10;
        }
      };
      const router = useRouter();
      const navigateToIrc = (i: any) => {
        router.push({ name: 'Irc20Detail', query: { id: i } }); // 使用路由的 name 属性进行跳转
      };
      return {
        progress,
        increaseProgress,
        navigateToIrc,
      };
    },
    computed: {},
  });
</script>
<style lang="less" scoped>
  .table-content__div {
    background: #1c1c1c;
  }
  .border-span {
    border: 1px solid #9ea0a5;
    padding: 2px 5px;
    border-radius: 5px;
    color: #9ea0a5;
  }
</style>
