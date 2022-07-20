<template>
  <div class="list_item">
    <div class="showArea">
      <input
        type="checkbox"
        class="Chekbox"
        v-model="check"
        @click="checkOk(item.id)"
      />
      <v-touch
        class="things"
        v-on:doubletap="dbcagList($event)"
        v-if="!isCag"
        >{{ item.todo }}</v-touch
      >
      <div class="things" v-if="isCag">
        <input
          type="text"
          v-model="cagVal"
          class="cag"
          @keydown.enter="cagList(item)"
        />
      </div>
      <span class="del_item" @click="delItem(item.id)">&times;</span>
    </div>
    <p class="time">{{ time }}</p>
    <div class="hrdel" v-if="checks"></div>
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
      default: {},
    },
  },
  data() {
    return {
      check: parseInt(this.item.upcoming) === 1,
      checks: false,
      isCag: false,
      cagVal: this.item.todo
    }
  },
  methods: {
    checkOk(id) {
      console.log('Check' + id)
      this.isCag = false
      this.checks = !this.checks
    },
    delItem(id) {
      this.$emit('delList', id)
    },
    dbcagList(e) {
      if (this.$store.state.toChange) {
        this.isCag = true
        const cage = e.target
        document.addEventListener('click', (e) => {
          const ele = e.target
          if (ele !== cage && ele.className !== 'cag') {
            this.cagList(this.item)
            this.isCag = false
          }
        })
      } else {
        this.$notify({
          message: '双击快速编辑功能未开启，请到我的页面点击开启此功能吧!',
          type: 'danger',
          duration: 1300,
        })
      }
    },
    cagList(item) {
      this.isCag = !this.isCag
      item.todo = item.todo.substring(0,25)
      this.$emit('cagList', item)
    },
  },
  computed: {
    time() {
      const time = new Date().getTime() - this.item.time
      if (Math.floor(time / (60 * 1000)) === 0) {
        return '刚刚'
      } else if (Math.floor(time / (60 * 1000)) > 60){
        return (time / (60 * 1000 ) / 60).toPrecision(2)+ ' 小时前'
      } else {
        return Math.floor(time / (60 * 1000 )) + ' 分钟前'
      }
    },
  },
  // 监听器
  watch: {
    isall: function () {
      this.check = this.isall
    },
    item: function () {
      this.cagVal = this.item.todo
    }
  },
  name: 'ListItem',
}
</script>

<style lang="less" scoped>
.list_item {
  height: 2.5rem;
  padding: 5px 30px;
  border-radius: 8px;
  width: 80%;
  margin: 15px auto;
  position: relative;
  background-color: rgba(243, 203, 203, 0.457);
}
.showArea {
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
.cag {
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
