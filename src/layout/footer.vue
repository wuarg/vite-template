<script setup lang="ts">
  import { isDark, useThemeChang } from '~/composables';
  import { useI18n } from '~/modules/i18n';
  const { t, toggleLocale } = useI18n();

  const { themeAni } = useThemeChang(isDark);
  const str = '</>';
</script>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'LayoutFooter',
  });
</script>
<template>
  <div class="flex items-center justify-center p-10">
    <img src="/src/assets/img/twitter.png" class="mx-5 w-10 sm:w-20" />
    <img src="/src/assets/img/discord.png" class="mx-5 w-10 sm:w-20" />
  </div>
</template>
<style lang="less" scoped>
  .nav-btn {
    @apply mx-2 cursor-pointer text-blue;
  }
</style>
