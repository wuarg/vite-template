<template>
  <a-dropdown :trigger="['click']" @visibleChange="handleVisibleChange">
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item v-for="item in dropdownItems" :key="item">
          {{ item.title }}
        </a-menu-item>
      </a-menu>
    </template>
    <slot></slot>
  </a-dropdown>
</template>

<script lang="ts">
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  export default {
    components: {},
    props: {
      triggerText: {
        type: String,
        default: 'Dropdown',
      },
      dropdownItems: {
        type: Array,
        required: true,
      },
    },
    setup() {
      const visible = ref(false);

      const handleVisibleChange = (isVisible: boolean) => {
        visible.value = isVisible;
      };
      const router = useRouter();
      const handleMenuClick = ({ key }) => {
        console.log('Clicked item key:', key);
        visible.value = false; // Close the dropdown after clicking an item
        if (key.isMenu) {
          router.push({ name: key.routerName }); // 使用路由的 name 属性进行跳转
        }
      };

      return {
        visible,
        handleVisibleChange,
        handleMenuClick,
      };
    },
  };
</script>

<style scoped>
  /* Add your custom styles here */

  .ant-dropdown-menu {
    background-color: none;
    background: url('../../assets/img/mk.png') no-repeat;
    background-size: 100% 100%;
    padding: 8px;
  }
  .ant-dropdown-menu-item:hover {
    background-color: #8c6dff;
  }
  .ant-dropdown-menu-submenu-title:hover {
    background-color: #8c6dff;
  }
</style>
