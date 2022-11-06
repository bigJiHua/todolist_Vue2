<template>
  <div id="HistoryM" class="HistoryM" ref="ScollBox">
    <div class="HistoryHeader" ref="HisHeader">
      <h1>代办历史</h1>
      <h3 v-if="is_login">累计完成 {{ History.length }} 件</h3>
    </div>
    <div v-if="is_login">
      <van-steps direction="vertical" :active="0">
        <van-step v-for="(item, index) in History" :key="index">
          <historyStep :item = item></historyStep>
        </van-step>
      </van-steps>
    </div>
    <div v-else class="elseBox">
      <van-empty description="空空如也,此功能需要登录才可使用" />
      <router-link to="/Login"><van-button>登录</van-button></router-link>
    </div>
    <a href="#" title="返回顶部" @click="totop"
        ><img
          src="https://jihau.top/img/zujian/upupday.png"
          alt="top"
          width="40px"
          height="40px"
          class="nonetop"
          ref="totop"
      /></a>
  </div>
</template>

<script>
import getHistory from '@/components/API/getTodoList'
import historyStep from '@/components/Module/HistoryStep'
export default {
  props: [],
  data () {
    return {
      History: [],
      is_login: parseInt(localStorage.getItem('Login')) === 1
    }
  },
  created () {
    if (this.History.length === 0) {
      this.getHistory()
    }
  },
  mounted () {
    const scrollview = this.$refs.ScollBox
    // 添加滚动监听，该滚动监听了拖拽滚动条
    // 尾部的 true 最好加上，我这边测试没加 true ，拖拽滚动条无法监听到滚动，加上则可以监听到拖拽滚动条滚动回调
    scrollview.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    async getHistory () {
      const { data: res } = await getHistory.getHistory()
      this.History = res.data
    },
    totop () {
      this.$refs.ScollBox.scrollTop = 0
    },
    handleScroll () {
      const indexHeader = this.$refs.totop
      if (indexHeader) {
        const scrollTop = this.$refs.ScollBox.scrollTop
        const HisHeader = this.$refs.HisHeader
        if (scrollTop > 50) {
          HisHeader.setAttribute('class', 'HisHeader')
        } else {
          HisHeader.setAttribute('class', 'HistoryHeader')
        }
        if (scrollTop >= 400) {
          indexHeader.setAttribute('class', 'top')
        } else if (scrollTop === 0) {
          indexHeader.setAttribute('class', 'nonetop')
        }
      }
    }
  },
  watch: {},
  computed: {},
  filters: {
    actime (time) {
      return new Date(parseInt(time))
    },
    fitime (fitime) {
      return new Date(parseInt(fitime))
    }
  },
  name: 'HistoryM',
  components: {
    historyStep
  }
}
</script>

<style lang="less" scoped>
.HistoryM{
  overflow: scroll;
  scroll-behavior: smooth;
}
.HistoryHeader {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px black solid;
  padding-bottom: 8px;
  > h3 {
    color: rgb(83, 188, 125);
  }
}
.HisHeader {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px black solid;
  padding-bottom: 8px;
  position: fixed;
  width: 92.5vw;
  z-index: 99;
  background-color: #fff;
  > h3 {
    color: rgb(83, 188, 125);
  }
}
.elseBox{
  margin-top: 20px;
  text-align: center;
}
.top {
  right: 15px;
  position: fixed;
  bottom: 100px;
  z-index: 99;
  width: 50px;
  height: auto;
  text-align: center;
}
.nonetop {
  display: none;
}
</style>
