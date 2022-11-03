<template>
  <div class="list_item">
    <div class="showArea">
      <input
        type="checkbox"
        class="Chekbox"
        v-model="check"
        v-if="is_delete"
        @click="checkOk(item.id)"
      />
      <v-touch
        :class="{ things: !checks, thingOk: checks }"
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
      <span class="del_item" @click="delItem(item)" v-if="is_delete"
        >&times;</span
      >
    </div>
    <p class="time">{{ time }}</p>
    <div class="hrdel" v-if="checks"></div>
  </div>
</template>

<script>
import TodosApi from '@/components/API/getTodoList'
export default {
  props: {
    isall: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      check: false,
      checks: false,
      isCag: false,
      Cagtodo: false,
      cagVal: this.item.todo,
      is_delete: true
    }
  },
  methods: {
    checkOk (id) {
      this.checks = !this.checks
      this.$emit('CheckOk', id)
    },
    delItem (item) {
      this.$dialog
        .confirm({
          message: '确定完成了，要删除了吗？'
        })
        .then(async () => {
          item.is_delete = 1
          if (this.$store.state.Login === 1 && localStorage.getItem('token')) {
            const { data: res } = await TodosApi.putTodolist(item)
            if (res.status === 200) {
              this.$notify({
                message: res.message,
                type: 'success',
                duration: 1000
              })
              this.$emit('toget')
            } else if (res.status === 406) {
              this.$notify({
                message: res.message,
                type: 'danger',
                duration: 1000
              })
              this.$emit('toget')
            }
          } else {
            const newDataArry = []
            JSON.parse(localStorage.getItem('todoList')).forEach((ditem) => {
              if (ditem.id === item.id) {
                ditem = item
              }
              newDataArry.push(ditem)
            })
            localStorage.setItem('todoList', JSON.stringify(newDataArry))
            setTimeout(() => {
              this.$emit('toget')
            }, 500)
          }
        })
    },
    dbcagList (e) {
      if (localStorage.getItem('toChange') === '1') {
        if (this.Cagtodo) {
          this.isCag = !this.isCag
          const cage = e.target
          document.addEventListener('click', (e) => {
            const ele = e.target
            if (ele !== cage && ele.className !== 'cag') {
              this.cagList(this.item)
              this.isCag = false
            }
          })
        } else {
          if (localStorage.getItem('met') === 'finishi') {
            this.$notify({
              message: '已经完成，快去新建任务吧!',
              type: 'danger',
              duration: 1300
            })
          } else if (localStorage.getItem('met') === 'delete') {
            this.$notify({
              message: '已删除咯，快去新建任务吧!',
              type: 'danger',
              duration: 1300
            })
          }
        }
      } else {
        this.$notify({
          message: '双击快速编辑功能未开启，请到我的页面点击开启此功能吧!',
          type: 'danger',
          duration: 1300
        })
      }
    },
    cagList (item) {
      this.isCag = !this.isCag
      if (item.todo !== this.cagVal) {
        item.todo = this.cagVal.substring(0, 25)
        this.$emit('cagList', item)
      }
    }
  },
  computed: {
    time () {
      const time = new Date().getTime() - this.item.time
      if (Math.floor(time / (60 * 1000)) === 0) {
        return '刚刚'
      } else if (Math.floor(time / (60 * 1000) / 60 / 24) >= 1) {
        return Math.floor(time / (60 * 1000) / 60 / 24).toPrecision(1) + '天前'
      } else if (Math.floor(time / (60 * 1000)) >= 60) {
        return (time / (60 * 1000) / 60).toPrecision(3) + ' 小时前'
      } else {
        return Math.floor(time / (60 * 1000)) + ' 分钟前'
      }
    }
  },
  // 监听器
  watch: {
    isall: function () {
      this.check = this.isall
    },
    item: {
      handler (newVal) {
        // console.log(newVal, newVal.finishi, newVal.upcoming, newVal.is_delete)
        if (
          newVal.finishi === 0 &&
          newVal.upcoming === 0 &&
          newVal.is_delete === 0
        ) {
          this.check = false
          this.checks = false
          this.Cagtodo = true
          this.is_delete = true
          // console.log('未完成、代办、可删除、可编辑、可选择')
        } else if (newVal.finishi === 1 && newVal.is_delete === 0) {
          this.check = true
          this.checks = true
          this.is_delete = true
          this.Cagtodo = false
          // console.log('完成、可删除、不可编辑、可以选择')
        } else if (newVal.is_delete === 1) {
          this.is_delete = false
          this.Cagtodo = false
          // console.log('删除、不可编辑、不可选择')
        }
      },
      immediate: true,
      deep: true
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
  margin: 20px auto;
  position: relative;
  background-color: rgba(243, 203, 203, 0.457);
}
.list_item:hover .del_item {
  display: block;
  font-size: 2rem;
  color: rgba(247, 51, 64, 0.9);
  font-weight: 500;
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
  margin-right: 15px;
}
.things {
  width: 100%;
  font-weight: 500;
  font-size: 1.2rem;
  overflow: overlay;
  padding: 0 5px;
}
.thingOk {
  width: 100%;
  font-weight: 500;
  font-size: 1.2rem;
  overflow: overlay;
  padding: 0 5px;
  color: grey;
}
.cag {
  padding: 10px;
  border: 0;
  border-radius: 5px;
}
.del_item {
  display: none;
}
.hrdel {
  width: 65%;
  position: absolute;
  top: 50%;
  left: 62px;
  height: 2px;
  background-color: rgba(247, 51, 64, 0.6);
}
.things::-webkit-scrollbar {
  display: none;
}
.time{
  float: right;
}
</style>
