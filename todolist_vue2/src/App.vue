<template>
  <div id="APP" class="APP">
    <Header class="Header"></Header>
    <router-view class="RView"></router-view>
    <FooterBar class="Footer"></FooterBar>
  </div>
</template>

<script>
import FooterBar from './components/FooterBar/FooterBar'
import Header from './components/Header/Header'

export default {
  name: 'APP',
  components: {
    Header,
    FooterBar,
  },
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
}
.Header {
  height: 5vh;
}
.RView {
  position: relative;
  height: 83vh;
  padding: 15px;
}
.Footer {
  height: 5vh;
}
</style>
