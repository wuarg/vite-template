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

    <BaseSelect
      v-model:value="selectedValue"
      :default-value="defaultSelectedValue"
      style="width: 200px"
      @change="handleSelectChange"
    >
      <!-- 这里是 MySelect 的插槽内容 -->
      <a-select-option value="1">Option 1</a-select-option>
      <a-select-option value="2">Option 2</a-select-option>
      <a-select-option value="3">Option 3</a-select-option>
    </BaseSelect>

    <BaseInputSearch
      v-model="searchValue"
      :default-search-value="defaultSearchValue"
      style="width: 200px"
    />

    <BaseDropdown :dropdown-items="menuItems">
      <a-button>
        {{ triggerText }}
        <a-icon :type="visible ? 'up' : 'down'" />
      </a-button>
    </BaseDropdown>

    <BaseButton @click="handleDeploy()">handleDeploy</BaseButton>
    <BaseButton @click="handleMint()">handleMint</BaseButton>
    <BaseButton @click="handleBuy()">handleBuy</BaseButton>
    <BaseButton @click="handleTransfer()">handleTransfer</BaseButton>
    <BaseButton @click="handleList()">handleList</BaseButton>
    <BaseButton @click="handleUnList()">handleUnList</BaseButton>
    <!-- // -->
    <Spinner v-if="loading" size="small" class="loader" />
  </div>
</template>

<script lang="ts">
  import BaseSelect from '~/components/core/Select.vue';
  import BaseInputSearch from '~/components/core/InputSearch.vue';
  import BaseDropdown from '~/components/core/Dropdown.vue';
  import BaseButton from '~/components/core/Button.vue';
  import Spinner from '~/components/core/Spinner.vue';

  import { defineComponent, ref } from 'vue';
  import { labelSystem } from '~/api/index';
  import { cancelToken } from '~/utils/service';
  import { BigNumber } from 'bignumber.js';
  import { environment } from '~/utils/iostConfig';

  import { ContractService } from '~/utils/contractServe';
  export default defineComponent({
    name: 'About',
    components: { BaseSelect, BaseInputSearch, BaseDropdown, BaseButton, Spinner },
    setup() {
      const loading = ref<boolean>(false);
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
      const defaultSelectedValue = '2';
      const handleSelectChange = (value: any) => {
        console.log('Selected value:', value);
      };
      // search 组件
      const searchValue = ref<string>('');
      const defaultSearchValue = 'initial search text';
      //
      const triggerText = 'Click me';

      const menuItems = [
        { key: 'item1', title: 'Item 1' },
        { key: 'item2', title: 'Item 2' },
        { key: 'item3', title: 'Item 3' },
      ];
      //
      const handleDeploy = async () => {
        try {
          const res = await ContractService.deployFunc('test', 10000, 1000);
        } catch (err: any) {
          if (err.indexOf('gas not enough') >= 0) {
            // this.showAlert('Gas不足', 'Gas not enough',
            //     '请通过抵押获得更多', 'Please pledge IOST to get more');
          } else if (err.indexOf('pay ram failed') >= 0) {
            // this.showAlert('Ram不足', 'Ram not enough',
            //     '请通过购买获得更多', 'Please buy some with IOST');
          } else {
            // this.showAlert('交易失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          }
        }
      };
      const handleMint = async () => {
        try {
          const res = await ContractService.mintFunc('test', 1000);
          console.log('handleMint----', res);
        } catch (err: any) {
          if (err.indexOf('gas not enough') >= 0) {
            // this.showAlert('Gas不足', 'Gas not enough',
            //     '请通过抵押获得更多', 'Please pledge IOST to get more');
          } else if (err.indexOf('pay ram failed') >= 0) {
            // this.showAlert('Ram不足', 'Ram not enough',
            //     '请通过购买获得更多', 'Please buy some with IOST');
          } else {
            // this.showAlert('交易失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          }
        }
      };
      const handleBuy = async () => {
        try {
          const res = await ContractService.buyFunc('test', 0);
          console.log('handleBuy----', res);
        } catch (err: any) {
          if (err.indexOf('gas not enough') >= 0) {
            // this.showAlert('Gas不足', 'Gas not enough',
            //     '请通过抵押获得更多', 'Please pledge IOST to get more');
          } else if (err.indexOf('pay ram failed') >= 0) {
            // this.showAlert('Ram不足', 'Ram not enough',
            //     '请通过购买获得更多', 'Please buy some with IOST');
          } else {
            // this.showAlert('交易失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          }
        }
      };
      const handleTransfer = async () => {
        loading.value = true;
        try {
          const res = await ContractService.transferFunc('test', 0, 'hulala');
          console.log('handleTransfer----', res);
        } catch (err: any) {
          if (err.indexOf('gas not enough') >= 0) {
            // this.showAlert('Gas不足', 'Gas not enough',
            //     '请通过抵押获得更多', 'Please pledge IOST to get more');
          } else if (err.indexOf('pay ram failed') >= 0) {
            // this.showAlert('Ram不足', 'Ram not enough',
            //     '请通过购买获得更多', 'Please buy some with IOST');
          } else {
            // this.showAlert('交易失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          }
        }
      };
      const handleList = async () => {
        try {
          const res = await ContractService.listFunc('test', 0, 10);
          console.log('handleList----', res);
        } catch (err: any) {
          if (err.indexOf('gas not enough') >= 0) {
            // this.showAlert('Gas不足', 'Gas not enough',
            //     '请通过抵押获得更多', 'Please pledge IOST to get more');
          } else if (err.indexOf('pay ram failed') >= 0) {
            // this.showAlert('Ram不足', 'Ram not enough',
            //     '请通过购买获得更多', 'Please buy some with IOST');
          } else {
            // this.showAlert('交易失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          }
        }
      };
      const handleUnList = async () => {
        try {
          const res = await ContractService.unlistFunc('test', 0);
          console.log('handleUnList----', res);
        } catch (err: any) {
          if (err.indexOf('gas not enough') >= 0) {
            // this.showAlert('Gas不足', 'Gas not enough',
            //     '请通过抵押获得更多', 'Please pledge IOST to get more');
          } else if (err.indexOf('pay ram failed') >= 0) {
            // this.showAlert('Ram不足', 'Ram not enough',
            //     '请通过购买获得更多', 'Please buy some with IOST');
          } else {
            // this.showAlert('交易失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          }
        }
      };
      return {
        loading,
        handleClick,
        handleCancel,
        visible,
        showDrawer,
        afterVisibleChange,
        checked,
        selectedValue,
        defaultSelectedValue,
        handleSelectChange,
        searchValue,
        defaultSearchValue,
        triggerText,
        menuItems,
        //
        handleDeploy,
        handleMint,
        handleBuy,
        handleTransfer,
        handleList,
        handleUnList,
      };
    },
  });
</script>
