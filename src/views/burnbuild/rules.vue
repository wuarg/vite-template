<script setup lang="ts">
  // import { useAppStore } from '~/stores/app';
  // const { countPlus, count } = useAppStore();
</script>

<template>
  <div class="rules-item">
    <div class="skill-list">
      <div class="skill-item flex">
        <div class="s-title flex items-center">
          <img src="/src//assets/img/logo.png" class="w-10" />
        </div>
        <div class="info flex-1">
          <div class="title-name" style="color: rgb(255, 255, 255); font-size: 18px">
            <p>燃烧规则声明</p>
            <p>以下引用到的代币符号代替 $burnedFi 简称($burn) $burnBuild 简称($build)</p>
            <p>将你的 $burn 代币计算成当前等值的 $BNB 同等数量铸造成 $build 代币作为(凭证)</p>
            <p>假设:</p><p>燃烧 1000枚 $burn 价值 1 $BNB 会铸造成 1 $build 代币作为你的凭证</p>
            <p>同时会铸造多 1 枚 $build 反思给所有 $build 持有者[根据 $build 持有数量]</p>
            <p>
              如果你是第一个燃烧价值 1 $BNB 的($burn)筹码会得到 1 $build 和 1 $build 反思 总共是 2
              枚
            </p>
            <p
              >当第二个燃烧价值 2 $BNB 的($burn)筹码 他会获得 2 $build 的凭证 和 1 $build 的反思
              你也会得到 1 $build (因为你占据了%50的份额)</p
            >
            <p>以此类推!</p>
            <p> - </p><p>索赔奖励:</p>
            <p>奖励计算 你持有的 $build - 你的凭证(build) = 你可提取的 $BNB 奖励</p>
            <p>
              假设你最初燃烧的价值是 1 $build (凭证) 当你累积到了 10 $build 那么你可以提取 9 $BNB
              的奖励!
            </p>
            <p>无论你的 $build 凭证数量是多少,当你提取奖励时你的凭证会被清零</p>
            <p>不要轻易领取奖励,留在社区建设</p><p> - </p><p>邀请奖励:</p>
            <p>当燃烧者使用你的链接进行燃烧 $burn 筹码时,你可以获得 %10 的 $burn 代币奖励</p>
            <p>如果你也是被邀请进来的,那么邀请你的人也可以获得 %5 的 $burn 代币奖励</p>
            <p>其他的 $burn 筹码会转移到黑洞 (0xdead) 地址 至少 %85</p></div
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .title-name {
    p {
      padding-bottom: 10px;
    }
  }
</style>
