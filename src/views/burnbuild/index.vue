<script setup lang="ts">
  import XDashboard from './dashboard.vue';
  import XTeam from './team.vue';
  import XRules from './rules.vue';
  import { useAppStore } from '~/stores/app';
  const { countPlus, count } = useAppStore();
</script>

<template>
  <div class="dashboard-page">
    <div class="section mx-auto my-10 w-3/5 p-5">
      <div class="dashboard-item stakes datas-view">
        <n-tabs type="line" animated>
          <n-tab-pane name="dashboard" tab="仪表盘">
            <XDashboard />
          </n-tab-pane>
          <n-tab-pane name="team" tab="下线">
            <XTeam />
          </n-tab-pane>
          <n-tab-pane name="rules" tab="规则">
            <XRules />
          </n-tab-pane>
        </n-tabs>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .section {
    border: 1px solid #3c3c3c;
    border-radius: 16px;
  }
</style>
