<template>
  <div id="HistoryM" class="HistoryM">
    <h1>代办历史</h1>
    <van-steps direction="vertical" :active="0">
      <van-step v-for="(item,index) in History" :key="index">
        <h3>{{item.todo}}</h3>
        <p>在{{dayjs(parseInt(item.time)).format('YYYY-MM-DD HH:mm:ss')}} -- {{dayjs(parseInt(item.ftime)).format('YYYY-MM-DD HH:mm:ss')}} 完成了</p>
        <p>累计用时 {{dayjs(parseInt(item.ftime - item.time)).format('HH:mm:ss') }} BUG !!!</p>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
import getHistory from '@/components/API/getTodoList'
export default {
  props: [],
  data () {
    return {
      History: []
    }
  },
  created () {
    if (this.History.length === 0) {
      this.getHistory()
    }
  },
  method () {},
  methods: {
    async getHistory () {
      const { data: res } = await getHistory.getHistory()
      this.History = res.data
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
  components: {}
}
</script>

<style lang="less" scoped></style>
