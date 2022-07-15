<template>
  <div class="list_item">
    <div class="showArea">
      <input type="checkbox" class="Chekbox" v-model="check" @click="checkOk(item.id)" />
      <v-touch class="things" v-on:doubletap="cagList($event)" v-if="!isCag">{{item.todo}}</v-touch>
      <div class="things" v-if="isCag"><input type="text" v-model="item.todo" class="cag"></div>
      <span class="del_item" @click="delItem(item.id)">&times;</span>
    </div>
    <div class="hrdel" v-if="check"></div>
  </div>
</template>

<script>
export default {
  props: {
    isall: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      check: parseInt(this.item.upcoming) === 1,
      isCag: false
    }
  },
  methods: {
    checkOk(id) {
      console.log('Check' + id)
      this.isCag = false
    },
    delItem(id) {
      this.$emit('delList', id)
    },
    cagList (e) {
      this.isCag = true
      const cage = e.target
      document.addEventListener('click',(e)=>{
        const ele = e.target
        if (ele !== cage && ele.className !== 'cag') {
          this.isCag = false
        }
      })
    }
  },
  // 监听器
  watch: {
    isall: function() {
      this.check = this.isall
    }
  },
  name: 'ListItem'
}
</script>

<style lang="less" scoped>
.list_item {
  height: 2.5rem;
  padding: 5px 30px;
  border-radius: 8px;
  width: 80%;
  margin: 15px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: rgba(243, 203, 203, 0.457);
}
.showArea{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.Chekbox {
  height: 25px;
  width: 25px;
}
.things {
  width: 100%;
  font-weight: 500;
  font-size: 1.2rem;
  overflow: overlay;
  padding: 0 5px;
}
.cag{
  padding: 10px;
  border: 0;
  border-radius: 5px;
}
.del_item {
  font-size: 2rem;
  color: rgba(247, 51, 64, 0.9);
  font-weight: 500;
}
.hrdel {
  width: 65%;
  position: absolute;
  top: 50%;
  left: 62px;
  height: 2px;
  background-color: rgba(247, 51, 64, 0.9);
}
</style>
