<template>
  <div id="" class="FooterBar">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">
        <router-link to="/">主页</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="user-o">
        <router-link to="/User">我的</router-link>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      active: '',
    }
  },
  directives: {},
  name: 'FootserBar',
  components: {
    // 导入组件
  },
}
</script>

<style lang="less" scoped>
.FooterBar {
}
</style>
