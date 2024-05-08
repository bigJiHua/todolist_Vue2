<template>
  <div id="" class="FooterBar">
    <router-link to="/history">
      <van-icon name="todo-list-o" /> <br />历史
    </router-link>
    <router-link to="/"> <van-icon name="records" /><br />主页 </router-link>
    <router-link to="/User"> <van-icon name="user-o" /><br />我的 </router-link>
  </div>
</template>

<script>
export default {
  name: 'FootserBar'
}
</script>

<style lang="less" scoped>
.FooterBar {
  background-color: #f9f9f9;
  position: fixed;
  bottom: 0;
  width: 100vw;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-around;
  align-items: center;
  > a {
    display: inline-block;
    padding: 10px 0;
    text-align: center;
    color: black;
    font-size: 1rem;
  }
}
.van-icon {
  font-size: 1.5rem;
}
</style>
