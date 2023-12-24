<script setup lang="ts">
  // import { useAppStore } from '~/stores/app';
  // const { countPlus, count } = useAppStore();
</script>

<template>
  <div class="dashboard-item">
    <div class="datas-list flex justify-between py-8">
      <div class="data-item flex items-center">
        <div class="icon">
          <i class="el-icon" style="font-size: 24px">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
              <path
                fill="currentColor"
                d="M640 832H64V640a128 128 0 1 0 0-256V192h576v160h64V192h256v192a128 128 0 1 0 0 256v192H704V672h-64v160zm0-416v192h64V416h-64z"
              ></path></svg></i
        ></div>
        <div class="value">
          <div class="value-title">总计燃烧 ($BurnBuild)</div>
          <!---->
        </div>
      </div>
      <div class="data-item flex items-center">
        <div class="icon">
          <i class="el-icon" style="font-size: 24px">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
              <path
                fill="currentColor"
                d="m161.92 580.736 29.888 58.88C171.328 659.776 160 681.728 160 704c0 82.304 155.328 160 352 160s352-77.696 352-160c0-22.272-11.392-44.16-31.808-64.32l30.464-58.432C903.936 615.808 928 657.664 928 704c0 129.728-188.544 224-416 224S96 833.728 96 704c0-46.592 24.32-88.576 65.92-123.264z"
              ></path>
              <path
                fill="currentColor"
                d="m161.92 388.736 29.888 58.88C171.328 467.84 160 489.792 160 512c0 82.304 155.328 160 352 160s352-77.696 352-160c0-22.272-11.392-44.16-31.808-64.32l30.464-58.432C903.936 423.808 928 465.664 928 512c0 129.728-188.544 224-416 224S96 641.728 96 512c0-46.592 24.32-88.576 65.92-123.264z"
              ></path>
              <path
                fill="currentColor"
                d="M512 544c-227.456 0-416-94.272-416-224S284.544 96 512 96s416 94.272 416 224-188.544 224-416 224zm0-64c196.672 0 352-77.696 352-160S708.672 160 512 160s-352 77.696-352 160 155.328 160 352 160z"
              ></path></svg></i
        ></div>
        <div class="value">
          <div class="value-title">总计领取 ($BurnBuild)</div
          ><!----></div
        >
      </div>
      <div class="data-item flex items-center">
        <div class="icon">
          <i class="el-icon is-loading" style="font-size: 24px">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
              <path
                fill="currentColor"
                d="m801.728 349.184 4.48 4.48a128 128 0 0 1 0 180.992L534.656 806.144a128 128 0 0 1-181.056 0l-4.48-4.48-19.392 109.696a64 64 0 0 1-108.288 34.176L78.464 802.56a64 64 0 0 1 34.176-108.288l109.76-19.328-4.544-4.544a128 128 0 0 1 0-181.056l271.488-271.488a128 128 0 0 1 181.056 0l4.48 4.48 19.392-109.504a64 64 0 0 1 108.352-34.048l142.592 143.04a64 64 0 0 1-34.24 108.16l-109.248 19.2zm-548.8 198.72h447.168v2.24l60.8-60.8a63.808 63.808 0 0 0 18.752-44.416h-426.88l-89.664 89.728a64.064 64.064 0 0 0-10.24 13.248zm0 64c2.752 4.736 6.144 9.152 10.176 13.248l135.744 135.744a64 64 0 0 0 90.496 0L638.4 611.904H252.928zm490.048-230.976L625.152 263.104a64 64 0 0 0-90.496 0L416.768 380.928h326.208zM123.712 757.312l142.976 142.976 24.32-137.6a25.6 25.6 0 0 0-29.696-29.632l-137.6 24.256zm633.6-633.344-24.32 137.472a25.6 25.6 0 0 0 29.632 29.632l137.28-24.064-142.656-143.04z"
              ></path>
            </svg>
          </i>
        </div>
        <div class="value">
          <div class="value-title">总计奖励 ($BurnBuild)</div
          ><!----></div
        >
      </div>
    </div>
    <div class="avg-prices mt-5">
      <div class="title"></div>
      <div class="price-list flex items-center">
        <!---->
        <div class="price-item w-full p-4">
          <div class="item-title mb-3 text-xl font-bold"><span>奖励 $burn</span></div>
          <div class="values flex items-center justify-between">
            <div class="item-value flex-1">
              <div>
                <span class="tag common-tag-border common-tag-theme-green"> 累计邀请分红奖励 </span>
              </div>
              <div class="price-value mt-3">
                <i class="el-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                    <path
                      fill="currentColor"
                      d="m161.92 580.736 29.888 58.88C171.328 659.776 160 681.728 160 704c0 82.304 155.328 160 352 160s352-77.696 352-160c0-22.272-11.392-44.16-31.808-64.32l30.464-58.432C903.936 615.808 928 657.664 928 704c0 129.728-188.544 224-416 224S96 833.728 96 704c0-46.592 24.32-88.576 65.92-123.264z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="m161.92 388.736 29.888 58.88C171.328 467.84 160 489.792 160 512c0 82.304 155.328 160 352 160s352-77.696 352-160c0-22.272-11.392-44.16-31.808-64.32l30.464-58.432C903.936 423.808 928 465.664 928 512c0 129.728-188.544 224-416 224S96 641.728 96 512c0-46.592 24.32-88.576 65.92-123.264z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M512 544c-227.456 0-416-94.272-416-224S284.544 96 512 96s416 94.272 416 224-188.544 224-416 224zm0-64c196.672 0 352-77.696 352-160S708.672 160 512 160s-352 77.696-352 160 155.328 160 352 160z"
                    ></path>
                  </svg> </i
                ><!---->
                <span class="usd-value"></span>
              </div>
            </div>
            <div class="item-value flex-1">
              <div><span class="tag common-tag-border common-tag-theme-yellow">邀请人数</span></div>
              <div class="price-value mt-3">
                <i class="el-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                    <path
                      fill="currentColor"
                      d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z"
                    ></path>
                  </svg>
                </i>
                <!---->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cat-page"></div>
  </div>
</template>

<style lang="less" scoped>
  .datas-list {
    border-bottom: 1px dashed hsla(0, 0%, 100%, 0.2);
    .data-item {
      .icon {
        width: 60px;
        height: 60px;
        border-radius: 60px;
        background: linear-gradient(180deg, #2a2a2a, #1b1b1b);
        border: 1px solid #3c3c3c;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        margin-right: 18px;
      }
      .value {
        .value-title {
          font-size: 16px;
          color: #fff;
          font-weight: 500;
        }
      }
    }
  }
  svg {
    height: 1em;
    width: 1em;
  }
  .el-icon.is-loading {
    animation: rotating 2s linear infinite;
  }

  @keyframes rotating {
    0% {
      transform: rotate(0);
    }

    to {
      transform: rotate(1turn);
    }
  }
  .avg-prices {
    // padding: 10px 40px;
    position: relative;
    .price-item {
      background: linear-gradient(180deg, #2a2a2a, #1b1b1b);
      border-radius: 16px;
      border: 1px solid #3c3c3c;
    }
  }
  .common-tag-theme-green {
    color: #44c323;
    background-color: #374c2e;
  }
  .common-tag-theme-yellow {
    color: #feb502;
    background-color: #594b2e;
  }
  .common-tag-border {
    border: 1px solid;
  }
  .common-tag-bg,
  .common-tag-border {
    display: inline-flex;
    align-items: center;
    min-height: 18px;
    font-size: 12px;
    box-sizing: border-box;
    line-height: 1;
    border-radius: 5px;
    padding: 2px 6px;
    font-weight: 600;
    text-transform: uppercase;
    transform: scale(0.94);
    transform-origin: left center;
  }
</style>
