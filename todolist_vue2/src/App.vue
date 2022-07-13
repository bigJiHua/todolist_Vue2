<template>
  <div id="APP" class="APP">
    <router-view class="RView"></router-view>
    <FooterBar class="Footer"></FooterBar>
  </div>
</template>

<script>
import FooterBar from './components/FooterBar/FooterBar'

export default {
  name: 'APP',
  components: {
    FooterBar,
  },
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
}
.RView {
  position: relative;
  height: 89.5vh;
  padding: 15px;
}
.Footer {
  height: 5vh;
}
</style>
