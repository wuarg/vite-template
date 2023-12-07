<template>
  <a-dropdown :trigger="['click']" @visibleChange="handleVisibleChange">
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item v-for="item in dropdownItems" :key="item.key">
          {{ item.title }}
        </a-menu-item>
      </a-menu>
    </template>
    <slot></slot>
  </a-dropdown>
</template>

<script lang="ts">
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

      const handleMenuClick = ({ key }) => {
        console.log('Clicked item key:', key);
        visible.value = false; // Close the dropdown after clicking an item
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
