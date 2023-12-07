<template>
  <div class="layout">
    <LayoutHeader />
    <div class="text-center sm:px-4 sm:pl-8">
      <!-- <p class="mt-16 text-3xl">The frst inscription platform on IOST</p>
      <img src="/src/assets/img/banner.png" class="mb-10 mt-8 inline w-1/3" alt="" /> -->
      <router-view></router-view>
    </div>
    <LayoutFooter />
  </div>
</template>
<script lang="ts">
  import LayoutHeader from './header.vue';
  import LayoutFooter from './footer.vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Layout',
    components: {
      LayoutHeader,
      LayoutFooter,
    },
  });
</script>
<style lang="less" scoped></style>
