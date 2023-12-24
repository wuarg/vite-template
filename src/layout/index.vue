<template>
  <div class="layout">
    <LayoutHeader />
    <div class="m-auto">
      <!-- <img src="/src/assets/logo.svg" class="mb-10 mt-8 inline w-48" alt="" /> -->
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
