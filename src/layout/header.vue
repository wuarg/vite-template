<template>
  <header class="header sticky top-0 flex h-16 items-center px-10 sm:h-20">
    <div class="bg delay-400 absolute transition-colors"></div>
    <div class="logo">
      <img src="/src/assets/img/logo.png" class="inline w-1/2" alt="" />
    </div>
    <div class="flex w-full justify-between">
      <div class="menu">
        <router-link to="/home" class="mx-4" active-class="font-black text-white">
          <span> {{ $t('home') }}</span>
        </router-link>
        <router-link to="/about" class="mx-4" active-class="font-black text-white">
          <span> {{ $t('about.link_name') }}</span>
        </router-link>
        <router-link to="/token" class="mx-4" active-class="font-black text-white">
          <span> {{ $t('tokens.menu') }}</span>
        </router-link>
        <router-link to="/marketplace" class="mx-4" active-class="font-black text-white">
          <span> {{ $t('marketplace.menu') }}</span>
        </router-link>
      </div>
      <div class="link">
        <button class="nav-btn ml-2 text-center" @click="toggleLocale()">
          <icon-carbon-language class="h-6 w-6" />
        </button>
      </div>
      <div class="fixed inset-x-0 bottom-0 my-10 text-center text-lg"> {{ account }} </div>
      <!-- <button class="nav-btn" @click="themeAni">
        <icon-carbon-sun v-if="!isDark" class="h-6 w-6" />
        <icon-carbon-moon v-else class="h-6 w-6" />
      </button> -->

      <!-- <a href="http://soulfree.cn" target="_blank" class="ml-2 text-center">
        <button class="nav-btn">
          <icon-mdi:blogger class="h-6 w-6" />
        </button>
      </a>
      <a href="https://github.com/AxyLm/vite-taicu" target="_blank" class="ml-2 text-center">
        <button class="nav-btn">
          <icon-carbon:logo-github class="h-6 w-6" />
        </button>
      </a> -->
    </div>
  </header>
</template>
<script setup lang="ts">
  import { isDark, useThemeChang } from '~/composables';
  // import { useI18n } from "vue-i18n";
  import { useI18n } from '~/modules/i18n';
  const { t, toggleLocale } = useI18n();

  const { themeAni } = useThemeChang(isDark);
</script>
<script lang="ts">
  import { commonStore } from '~/stores/modules/common';
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'LayoutHeader',
    setup() {
      const appStore = commonStore();
      const account = appStore.getAccount;
      return {
        account,
      };
    },
  });
</script>
<style lang="less" scoped>
  .header .bg {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    backdrop-filter: saturate(250%) blur(20px);
    box-shadow: 0px 0px 25px 5px rgb(10 10 10 / 12%);
  }

  .dark {
    .header .bg {
      // background: rgba(40, 40, 40, 0.5) !important;
      box-shadow: 0px 0px 25px 5px rgb(0 0 0 / 12%) !important;
    }
  }

  .nav-btn {
    @apply w-8 text-center transition-none dark:text-base-1 dark:transition-none;
  }
  .title {
    @apply text-2xl font-normal text-base-13   delay-300  dark:text-base-1 dark:transition-colors;
  }
</style>
