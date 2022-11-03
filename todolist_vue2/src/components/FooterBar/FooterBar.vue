<template>
  <div id="" class="FooterBar">
    <div>
      <router-link to="/history"> <van-icon name="todo-list-o" /> <br>历史 </router-link>
    </div>
    <div>
      <router-link to="/"> <van-icon name="records" /><br>主页 </router-link>
    </div>
    <div>
      <router-link to="/User"> <van-icon name="user-o" /><br>我的 </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {}
  },
  directives: {},
  name: 'FootserBar',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
.FooterBar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  padding: 8px 30px;
  >div{
    text-align: center;
    >a{
      color: black;
      font-size: 1rem;
    }
  }
}
.van-icon{
  font-size: 1.5rem;
}
</style>
