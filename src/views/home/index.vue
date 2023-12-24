<script setup lang="ts">
  import { useAppStore } from '~/stores/app';
  const { countPlus, count } = useAppStore();
</script>

<template>
  <div class="home-page">
    <section class="section-item section-token">
      <div class="token-infos mx-auto my-10 w-3/5 py-10">
        <div class="item-title text-white mb-10 text-3xl font-bold">BurnedFi</div>
        <div class="item-brief mb-5">• Total Supply: 21,000,000 $BurnedFi</div>
        <div class="item-brief mb-5">• Buys / Sells taxes: 1%</div>
        <div class="item-brief mb-5">• Ownership: Renounced</div>
        <div class="item-brief mb-5">• LP Status: Burned</div>
        <div class="item-contract">
          Contract <div>0x19c018e13CFf682e729CC7b5Fb68c8A641bf98A4</div></div
        >
        <div class="item-brief">• Holder: 6457</div>
      </div>
    </section>
    <section class="section-item section-features">
      <div class="normal-layout section-content mx-auto my-10 w-3/5 py-10">
        <div class="title text-white my-10 text-3xl font-bold">BurnedFi ECONOMICS</div>
        <div class="feature-list">
          <n-grid :x-gap="16" :y-gap="16" :cols="3">
            <n-grid-item>
              <div class="common-bg feature-item">
                <div class="title">Fair Launch Mint</div>
                <div class="brief flex items-center">
                  • Ownership renounced
                  <i class="el-icon ml-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path>
                    </svg>
                  </i>
                </div>
                <div class="brief flex items-center">
                  • LP Burnt
                  <i class="el-icon ml-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path>
                    </svg>
                  </i>
                </div>
                <div class="brief flex items-center">
                  • 0.002BNB for 100 BurnedFi<i class="el-icon ml-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path>
                    </svg>
                  </i>
                </div>
                <div class="brief flex items-center">
                  • 10 mint limit per block<i class="el-icon ml-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path>
                    </svg>
                  </i>
                </div>
                <div class="brief flex items-center">
                  • 200 mint limit per minute<i class="el-icon ml-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path>
                    </svg>
                  </i>
                </div>
                <div class="brief flex items-center">
                  • Token will launch after 150,000 mint<i class="el-icon ml-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path>
                    </svg>
                  </i>
                </div>
              </div>
            </n-grid-item>
            <n-grid-item>
              <div class="common-bg feature-item"
                ><div class="title">BurnedFi ECONOMICS</div
                ><div class="brief flex items-center"
                  >• Tax: 1% (Burned Incentive)<i class="el-icon ml-5"
                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path></svg></i></div
                ><div class="brief flex items-center"
                  >• Auto-Burn Tech: $BurnedFi has auto burn tech that burning supply every hour
                  from the liquidity pool without tax.</div
                ><div class="brief flex items-center"
                  >• Auto-Burn .25% per hour<i class="el-icon ml-5"
                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path></svg></i></div
              ></div>
            </n-grid-item>
            <n-grid-item>
              <div class="common-bg feature-item"
                ><div class="title">Burned Incentive</div
                ><div class="brief flex items-center"
                  >• Burn $BurnedFi to mint $BurnedBuild<i class="el-icon ml-5"
                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path></svg></i></div
                ><div class="brief flex items-center"
                  >• Calculate $BurnedFi current market price minted equivalent $BurnedBuild<i
                    class="el-icon ml-5"
                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path></svg></i></div
                ><div class="brief flex items-center"
                  >• Incentive Pool Check $BurnedFi BNB Balance<i class="el-icon ml-5"
                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path></svg></i></div
              ></div>
            </n-grid-item>
            <n-grid-item>
              <div class="common-bg feature-item"
                ><div class="title">$BurnedBuild</div
                ><div class="brief flex items-center"
                  >• Burn Mint Get $BurnedBuild Rethink $BNB Incentives<i class="el-icon ml-5"
                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path></svg></i></div
                ><div class="brief flex items-center"
                  >• burn Mint Market 1 $BNB to get $BurnedFi and reflect 1 $BNB to Build Holder<i
                    class="el-icon ml-5"
                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path></svg></i></div
                ><div class="brief flex items-center"
                  >• withdraw your Build Reward at any time<i class="el-icon ml-5"
                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path></svg></i></div
                ><div class="brief flex items-center"
                  >• Invite Burning Reward<i class="el-icon ml-5"
                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path></svg></i></div
              ></div>
            </n-grid-item>
            <n-grid-item>
              <div class="common-bg feature-item"
                ><div class="title">Invite Burning</div
                ><div class="brief flex items-center"
                  >• 10% $BurnedFi Token Share to Invite<i class="el-icon ml-5"
                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path></svg></i></div
                ><div class="brief flex items-center"
                  >• Burn at least 90%~85%<i class="el-icon ml-5"
                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path></svg></i></div
              ></div>
            </n-grid-item>
            <n-grid-item>
              <div class="common-bg feature-item"
                ><div class="title">Let's start our burning journey!</div
                ><div class="brief flex items-center"
                  >• Burned<i class="el-icon ml-5"
                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path></svg></i></div
                ><div class="brief flex items-center"
                  >• Burned &amp; Build
                  <i class="el-icon ml-5"
                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path></svg></i></div
                ><div class="brief flex items-center"
                  >• Burned &amp; Build &amp; Reward
                  <i class="el-icon ml-5"
                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                      ></path></svg></i></div
              ></div>
            </n-grid-item>
          </n-grid>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .home-page {
    .item-contract {
      margin-bottom: 20px;
      margin-top: 20px;
      background: #000;
      border-radius: 16px;
      border: 1px solid #3c3c3c;
      font-weight: 600;
      font-size: 16px;
      padding: 20px 28px 24px 28px;
      position: relative;
    }
    .section-features {
      background: linear-gradient(180deg, #2a2a2a, #1b1b1b);
      .feature-list {
        .feature-item {
          // margin: 15px;
          flex: 1;
          padding: 20px 20px 38px;
          // min-width: 360px;
          transition: transform 0.4s ease;
          box-sizing: border-box;
          background: linear-gradient(180deg, #303030, #1b1b1b);
          border-radius: 16px;
          border: 1px solid #3c3c3c;
          &:hover {
            transform: translateY(-8px);
          }
          .title {
            font-size: 28px;
            font-weight: 600;
            color: #fff;
            height: 76px;
            display: flex;
            align-items: center;
          }
          .brief {
            font-size: 16px;
            color: hsla(0, 0%, 100%, 0.8);
            line-height: 1.5;
            margin-top: 2px;
          }
        }
        .common-bg {
          height: 100%;
        }
      }
    }
  }
  svg {
    height: 1em;
    width: 1em;
  }
</style>
