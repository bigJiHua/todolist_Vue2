<template>
  <div id="" class="ChangeModule">
    <p class="NotesH">
      个性设置 <span class="HTips">JiHua TodoList V-1.0.0</span>
      <router-link to="/User" class="cbbtn">返回</router-link>
    </p>
    <div class="elseBox">
      <van-empty description="功能区暂未开发，敬请期待..." />
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {}
  },
  created () {

  },
  method () {},
  methods: {},
  watch: {},
  computed: {},
  filters: {},
  name: 'ChangeModule',
  components: {
  }
}
</script>

<style lang="less" scoped>
.ChangeModule{
  overflow: scroll;
}
.NotesH {
  border-bottom: 1px black solid;
  margin-bottom: 10px;
  font-size: 1.8rem;
  font-weight: 400;
  padding-bottom: 10px;
  .HTips {
    font-size: 1rem;
  }
  .cbbtn{
    padding: 10px;
    display: block;
    font-size: 1.1rem;
    float: right;
    color: rgba(54, 33, 33, 0.8);
    font-weight: 600;
  }
}
.elseBox{
  margin-top: 20px;
  text-align: center;
}
</style>
