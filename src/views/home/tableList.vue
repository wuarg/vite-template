<template>
  <div class="table-content my-5">
    <h1 class="text-white my-5 text-left">IOST 铭文</h1>
    <div v-for="i in 5" :key="i" class="table-content__div my-3 flex rounded p-2">
      <div class="left mr-5">
        <img src="/src/assets/img/twitter.png" class="h-8 w-8" />
      </div>
      <div class="right flex-1">
        <div class="right__div flex items-center justify-between py-2">
          <div class="label">
            <p class="mb-2">IRC- 100 IOST</p>
            <p class="mb-0 opacity-50">#00001</p>
          </div>
          <div class="value">
            <span class="num border-span">20 IOST</span>
          </div>
        </div>
        <div class="right__div flex items-center justify-between py-2">
          <div class="label">
            <p class="mb-2 opacity-50">From</p>
          </div>
          <div class="value">
            <span class="num">cl-debt1817</span>
          </div>
        </div>
        <div class="right__div flex items-center justify-between py-2">
          <div class="label opacity-50">
            <p class="mb-2">To</p>
          </div>
          <div class="value">
            <span class="num">nftcraft</span>
          </div>
        </div>
        <div class="right__div flex items-center justify-between py-2">
          <div class="label opacity-50">
            <p class="mb-2">2023/11/26 18:00:00</p>
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
  export default defineComponent({
    name: 'TableList',
    setup() {
      onMounted(() => {
        // connectWith(connectors[0]);
      });
      return {};
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
