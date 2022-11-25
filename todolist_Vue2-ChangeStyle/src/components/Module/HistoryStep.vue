<template>
  <div id="" class="">
    <h3>{{ item.todo }}</h3>
    <p>
      在{{ dayjs(parseInt(item.time)).format('YYYY-MM-DD HH:mm:ss') }} --
      {{ dayjs(parseInt(item.ftime)).format('YYYY-MM-DD HH:mm:ss') }} 完成了
    </p>
    <p>累计用时 {{ time }}</p>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  created () {},
  method () {},
  methods: {},
  watch: {},
  computed: {
    time () {
      const difftime = (this.item.ftime - this.item.time) / 1000
      const days = parseInt(difftime / 86400)
      const hours = parseInt(difftime / 3600) - 24 * days
      const minutes = parseInt((difftime % 3600) / 60)
      const seconds = parseInt(difftime % 60)
      return `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`
    }
  },
  filters: {},
  name: 'HistoryStep',
  components: {}
}
</script>

<style lang="less" scoped></style>
