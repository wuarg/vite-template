<template>
  <div class="font-normal">
    <span class="text-3xl" @click="handleClick()">About</span>
    <a-checkbox v-model:checked="checked">Checkbox</a-checkbox>
    <a-button type="primary" @click="showDrawer">Open</a-button>
    <a-drawer
      v-model:visible="visible"
      class="custom-class"
      :header-style="{ background: '#8456FC' }"
      :drawer-style="{ background: '#8456FC' }"
      title="Basic Drawer"
      placement="right"
      @after-visible-change="afterVisibleChange"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
    <p class="text-2xl">{{ $t('about.title') }}</p>
    <!-- <p class=""> Vite + Vue3、Pinia、TypeScript、Eslint、Prettier、LintStaged、Tailwindcss </p> -->
    <ul class="m-auto mt-4 inline-block w-auto list-disc text-left text-xl">
      <li>
        ⚡️ <a target="_blank" href="https://github.com/vuejs/vue-next">Vue 3</a>,
        <a target="_blank" href="https://github.com/vitejs/vite">Vite</a>,
        <a target="_blank" href="https://www.typescriptlang.org/zh/" rel="nofollow">TypeScript</a>
        Yes!</li
      >
      <li>
        🍍 <a target="_blank" href="https://pinia.esm.dev/" rel="nofollow">Pinia</a> -
        {{ $t('about.package_pinia') }}
      </li>
      <li>
        😃
        <a target="_blank" href="https://github.com/antfu/unocss/tree/main/packages/preset-icons"
          >Iconify
        </a>
        <span> - {{ $t('about.package_icon') }} </span>
        <a target="_blank" href="https://icones.netlify.app/" rel="nofollow">🔍 Icones</a>
      </li>
      <li>
        🌍 <a target="_blank" href="/AxyLm/vite-taicu/blob/main/locales">I18n </a
        >{{ $t('about.package_i18n') }}
      </li>
      <li
        >🎨 <a target="_blank" href="https://www.tailwindcss.cn/" rel="nofollow">Tailwindcss</a>
        <span> - {{ $t('about.package_tailwindcss') }} </span>
      </li>
      <li>
        🛠 <a target="_blank" href="https://github.com/antfu/vueuse">VueUse</a>
        <span>- {{ $t('about.package_vueuse') }}</span>
      </li>
      <li>
        <a target="_blank" href="http://eslint.cn/" rel="nofollow">Eslint</a> +
        <a target="_blank" href="https://prettier.io/" rel="nofollow">Prettier</a> +
        <a target="_blank" href="https://typicode.github.io/husky/" rel="nofollow">Husky</a>
        {{ $t('about.package_format') }}
      </li>
      <li>
        <a target="_blank" href="https://github.com/AxyLm/vite-taicu/blob/main/LICENSE"
          >MIT License</a
        >
        {{ $t('about.package_license') }}
      </li>
    </ul>

    <p class="mt-4 text-lg">{{ $t('about.desc') }} </p>
    <code> new FastifyIdea(); </code>

    {{ selectedValue }} -- {{ defaultSelectedValue }}
    <BaseSelect v-model="selectedValue" :default-value="defaultSelectedValue" style="width: 200px">
      <!-- 这里是 MySelect 的插槽内容 -->
      <a-select-option value="option1">Option 1</a-select-option>
      <a-select-option value="option2">Option 2</a-select-option>
      <a-select-option value="option3">Option 3</a-select-option>
    </BaseSelect>
  </div>
</template>

<script lang="ts">
  import BaseSelect from '~/components/core/Select.vue';
  import { defineComponent, ref } from 'vue';
  import { labelSystem } from '~/api/index';
  import { cancelToken } from '~/utils/service';
  export default defineComponent({
    name: 'About',
    components: { BaseSelect },
    setup() {
      const handleClick = async () => {
        await labelSystem()
          .then((res) => {
            console.log('res: ', res);
          })
          .catch(() => {
            // ElMessage.error('请求失败 请求已取消！');
          });
      };

      const handleCancel = () => {
        // 在适当的时机调用取消请求（例如点击取消按钮）
        if (cancelToken) {
          cancelToken.cancel('取消请求');
        }
      };
      const visible = ref<boolean>(false);

      const afterVisibleChange = (bool: boolean) => {
        console.log('open', bool);
      };

      const showDrawer = () => {
        visible.value = true;
      };
      const checked = ref(false);

      //select 组件
      const selectedValue = ref<string | number | null>(null);
      const defaultSelectedValue = 'option2';
      return {
        handleClick,
        handleCancel,
        visible,
        showDrawer,
        afterVisibleChange,
        checked,
        selectedValue,
        defaultSelectedValue,
      };
    },
  });
</script>

<style lang="less" scoped>
  ul a {
    @apply text-skin-700 dark:text-skin-600;
  }
</style>
