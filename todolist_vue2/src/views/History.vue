<template>
  <div id="HistoryM" class="HistoryM">
    <div class="HistoryHeader" >
      <h1>代办历史</h1>
      <h3 v-if="is_login">累计完成 {{ History.length }} 件</h3>
    </div>
    <div class="DataList" ref="ScollBox" v-if="is_login">
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
import getHistory from '@/API/getTodoList'
import historyStep from '@/components/Module/HistoryStep'
export default {
  props: [],
  data () {
    return {
      History: [],
      is_login: localStorage.getItem('token')
    }
  },
  created () {
    if (this.is_login) {
      this.getHistory()
    }
  },
  mounted () {
  },
  methods: {
    async getHistory () {
      const { data: res } = await getHistory.getHistory()
      this.History = res.data
    },
    totop () {
      this.$refs.ScollBox.scrollTop = 50
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
.HistoryHeader {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px black solid;
  padding: 10px;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width:calc(100vw - 20px);
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
.DataList {
  margin-top: 50px;
  height: calc(100vh - 130px);
  overflow: scroll;
}
</style>
