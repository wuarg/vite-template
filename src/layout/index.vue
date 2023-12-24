<template>
  <div class="layout">
    <LayoutHeader />
    <div class="m-auto">
      <!-- <img src="/src/assets/logo.svg" class="mb-10 mt-8 inline w-48" alt="" /> -->
      <n-config-provider :theme="darkTheme">
        <router-view></router-view>
      </n-config-provider>
    </div>
    <LayoutFooter />
  </div>
</template>
<script lang="ts">
  import LayoutHeader from './header.vue';
  import LayoutFooter from './footer.vue';
  import { defineComponent } from 'vue';
  import { darkTheme } from 'naive-ui';

  export default defineComponent({
    name: 'Layout',
    components: {
      LayoutHeader,
      LayoutFooter,
    },
    setup() {
      return {
        darkTheme,
      };
    },
  });
</script>
