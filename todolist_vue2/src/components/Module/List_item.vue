<template>
  <div class="list_item">
    <input type="checkbox" class="Chekbox" v-model="check" @click="checkOk(item.id)" />
    <p class="things">{{item.todo}}</p>
    <span class="del_item" @click="delItem(item.id)">&times;</span>
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
      check: this.item.tf === 'true'
    }
  },
  methods: {
    checkOk(id) {
      console.log('Check' + id)
    },
    delItem(id) {
      console.log('del' + id)
    },
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
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: rgba(243, 203, 203, 0.457);
}
.Chekbox {
  height: 25px;
  width: 25px;
}
.things {
  width: 70%;
  overflow: scroll;
  font-weight: 500;
  font-size: 1.2rem;
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
