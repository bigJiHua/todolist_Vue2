<template>
  <div id="" class="APP">
	  <router-view></router-view>
	  <FooterBar></FooterBar>
  </div>
</template>

<script>
import FooterBar from './components/FooterBar/FooterBar'

export default {
  name: 'APP',
  components: {
	FooterBar
  }
}
</script>

<style lang="less" scoped>
</style>
