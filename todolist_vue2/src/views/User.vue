<template>
  <div id="" class="User">
    <h1>用户</h1>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'

export default {
  props: [],
  data() {
    return {}
  },
  // 生命周期初始化函数
  // created: {
  //
  // },
  // 方法
  methods: {
    toback() {
      this.$router.push('/Home')
    },
    loginOuts() {
      console.log('退出登录')
    },
  },
  // 监听器
  watch: {},
  // 当前组件的计算属性
  computed: {},
  // 过滤器
  filters: {},
  // Vue 中自定义属性
  directives: {},
  name: 'User',
  components: {
    Header,
  },
}
</script>

<style lang="less" scoped></style>
