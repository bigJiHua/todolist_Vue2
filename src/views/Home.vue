<template>
  <div>
    <div class="content_body" id="content_body">
      <h1 class="DBDR">I Want todo</h1>
      <div class="inputArea">
        <van-icon name="arrow-down" class="Chekbox" @click="checkAll()" />
        <input type="text" class="inputBox" placeholder="输入要做的事 (Limit 25)" v-model="newTodo"
          @keydown.enter="addTodo" />
        <button class="addBtn" @click="addTodo">添加</button>
      </div>
      <div class="todoList">
        <van-pull-refresh v-model="loading" success-text="刷新成功" @refresh="onRefresh">
          <todolist :isall="isall" v-for="(item, index) in TodoList" :key="index" :item="item" @cagList="patchList"
            @CheckOk="CheckOk" @toget="toget"></todolist>
        </van-pull-refresh>
      </div>
      <div class="bottom_Count" v-if="!isall">
        <div class="Center_Count">
          <button @click="CountNum('all')">代办&nbsp;{{ Count.upcoming }}</button>
          <button @click="CountNum('finishi')">完成&nbsp;{{ Count.finishi }}</button>
          <button @click="CountNum('delete')">删除&nbsp;{{ Count.is_delete }}</button>
        </div>
      </div>
      <div class="isAllBox" v-else>
        <van-button @click="AllrecDel('all')">{{ AllcheckOk }}</van-button>
        <van-button @click="AllrecDel('delete')">全部删除</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import todolist from '@/components/Module/List_item.vue'
import getTodolist from '@/components/API/getTodoList'
export default {
  data () {
    return {
      isall: false,
      TodoList: [],
      newTodo: '',
      checkupl: parseInt(localStorage.getItem('Upload')) !== 0,
      loading: false,
      count: 0,
      Count: {
        finishi: this.$store.state.Count.finishi,
        upcoming: this.$store.state.Count.upcoming,
        is_delete: this.$store.state.Count.is_delete
      },
      AllcheckOk: '全部完成'
    }
  },
  created () {
    this.getlist()
    if (localStorage.getItem('toChange') === null) {
      localStorage.setItem('toChange', 0)
    }
  },
  methods: {
    // 获取
    async getlist () {
      if (parseInt(localStorage.getItem('Login')) === 1) {
        const { data: res } = await getTodolist.getTodolist()
        if (res.status === 401) {
          this.$notify({
            message: '登录过期，当前数据是本地数据',
            type: 'success',
            duration: 2200
          })
          localStorage.removeItem('Login')
          localStorage.removeItem('Upload')
          localStorage.removeItem('toChange')
          localStorage.removeItem('Count')
          localStorage.removeItem('token')
          localStorage.removeItem('Username')
        } else if (res.status !== 406) {
          this.$notify({
            message: res.message,
            type: 'success',
            duration: 1500
          })
          this.$store.dispatch('CountData', this.Count)
          const newArryData = res.data
          if (localStorage.getItem('todoList')) {
            JSON.parse(localStorage.getItem('todoList')).forEach((item) => {
              if (item.new) {
                newArryData.push(item)
              }
            })
          }
          localStorage.setItem(
            'todoList',
            JSON.stringify(newArryData.reverse())
          )
        } else {
          this.$notify({
            message: '云端空空如也，当前获取的是本地数据',
            type: 'primary',
            duration: 1000
          })
          this.TodoList =
            JSON.parse(localStorage.getItem('todoList')) === null
              ? []
              : JSON.parse(localStorage.getItem('todoList'))
        }
      }
      this.CountNum(localStorage.getItem('met'))
    },
    // 添加
    async addTodo () {
      if (this.newTodo !== '' && this.newTodo.length !== 0) {
        const todo = {
          id: this.TodoList.length,
          username:
            localStorage.getItem('Username') === null
              ? 'location'
              : localStorage.getItem('Username'),
          todo: this.newTodo.substring(0, 25),
          finishi: 0,
          upcoming: 0,
          is_delete: 0,
          time: new Date().getTime(),
          new: true
        }
        // 如果开启的上传云端
        if (
          this.checkupl &&
          localStorage.getItem('Username') &&
          localStorage.getItem('Upload')
        ) {
          delete todo.new
          const { data: res } = await getTodolist.addTodolist(todo)
          if (res.status === 200) {
            this.$notify({
              message: res.message,
              type: 'success',
              duration: 1000
            })
            setTimeout(() => {
              this.getlist()
            }, 1000)
          } else if (res.status === 406) {
            this.$notify({
              message: res.message,
              type: 'danger',
              duration: 1000
            })
          }
        } else {
          this.TodoList.push(todo)
          this.$notify({
            message: '添加成功',
            type: 'success',
            duration: 2000
          })
          localStorage.setItem('todoList', JSON.stringify(this.TodoList))
        }
        this.newTodo = ''
      } else {
        this.$notify({
          message: '輸入的值不能爲空哦！',
          type: 'danger',
          duration: 1000
        })
      }
    },
    // 更改
    async patchList (data) {
      if (data.todo !== '') {
        const { data: res } = await getTodolist.putTodolist(data)
        if (res.status === 200) {
          this.$notify({
            message: res.message,
            type: 'success',
            duration: 1000
          })
        } else if (res.status === 202) {
          this.$notify({
            message: res.message,
            type: 'danger',
            duration: 1000
          })
        }
      } else {
        this.$notify({
          message: '修改值为空！',
          type: 'danger',
          duration: 1300
        })
      }
    },
    // 选择完成
    async CheckOk (id, met) {
      if (met === 'rec') {
        const newDataArry = []
        JSON.parse(localStorage.getItem('todoList')).forEach((item) => {
          item.ftime = String(new Date().getTime())
          if (item.id === id) {
            switch (item.finishi) {
              case 0: {
                item.finishi = 1
                item.upcoming = 1
                if (localStorage.getItem('Login')) {
                  this.patchList(item)
                } else {
                  newDataArry.push(item)
                }
                break
              }
              case 1: {
                item.finishi = 0
                item.upcoming = 0
                if (localStorage.getItem('Login')) {
                  this.patchList(item)
                } else {
                  newDataArry.push(item)
                }
                break
              }
            }
          } else {
            newDataArry.push(item)
          }
        })
        localStorage.setItem('todoList', JSON.stringify(newDataArry))
        setTimeout(() => {
          this.getlist()
        }, 1000)
      } else {
        this.$dialog
          .confirm({
            message: '要进行变更吗？'
          })
          .then(async () => {
            const newDataArry = []
            JSON.parse(localStorage.getItem('todoList')).forEach((item) => {
              item.ftime = String(new Date().getTime())
              if (item.id === id) {
                switch (item.finishi) {
                  case 0: {
                    item.finishi = 1
                    item.upcoming = 1
                    if (localStorage.getItem('Login')) {
                      this.patchList(item)
                    } else {
                      newDataArry.push(item)
                    }
                    break
                  }
                  case 1: {
                    item.finishi = 0
                    item.upcoming = 0
                    if (localStorage.getItem('Login')) {
                      this.patchList(item)
                    } else {
                      newDataArry.push(item)
                    }
                    break
                  }
                }
              } else {
                newDataArry.push(item)
              }
            })
            localStorage.setItem('todoList', JSON.stringify(newDataArry))
          })
        this.toget()
      }
    },
    onRefresh () {
      this.getlist()
      this.loading = false
      this.CountNum(localStorage.getItem('met'))
    },
    // 全选
    checkAll () {
      if (localStorage.getItem('met') === 'all') {
        this.isall = !this.isall
        this.AllcheckOk = '全部完成'
      } else if (localStorage.getItem('met') === 'finishi') {
        this.isall = !this.isall
        this.AllcheckOk = '全部恢复'
      } else if (localStorage.getItem('met') === 'delete') {
        this.isall = false
        this.$notify({
          message: '已删除的无法操作哟!',
          type: 'danger',
          duration: 1000
        })
      }
    },
    toget () {
      setTimeout(() => {
        this.getlist()
      }, 2200)
    },
    // 统计数据
    CountNum (met) {
      this.Count.finishi = 0
      this.Count.upcoming = 0
      this.Count.is_delete = 0
      if (localStorage.getItem('todoList')) {
        JSON.parse(localStorage.getItem('todoList')).forEach((item) => {
          // 删除数量
          if (item.is_delete === 1) {
            this.Count.is_delete += 1
          }
          // 完成数量
          if (
            (item.finishi === 1 && item.is_delete === 1) ||
            (item.finishi === 1 && item.is_delete === 0)
          ) {
            this.Count.finishi += 1
          }
          // 代办数量
          if (
            item.upcoming === 0 &&
            item.is_delete === 0 &&
            item.finishi === 0
          ) {
            this.Count.upcoming += 1
          }
        })
        this.$store.dispatch('CountData', this.Count)
        switch (met) {
          case 'all': {
            this.TodoList = []
            JSON.parse(localStorage.getItem('todoList')).forEach((item) => {
              if (
                item.is_delete === 0 &&
                item.upcoming === 0 &&
                item.is_delete === 0
              ) {
                this.TodoList.push(item)
              }
            })
            localStorage.setItem('met', 'all')
            break
          }
          case 'alls': {
            this.TodoList = []
            JSON.parse(localStorage.getItem('todoList')).forEach((item) => {
              if (
                (item.is_delete === 0 &&
                  item.finishi === 0 &&
                  item.upcoming === 0) ||
                item.finishi === 1
              ) {
                this.TodoList.push(item)
              }
            })
            localStorage.setItem('met', 'alls')
            break
          }
          case 'finishi': {
            this.TodoList = []
            JSON.parse(localStorage.getItem('todoList')).forEach((item) => {
              if (
                item.finishi === 1 &&
                item.upcoming === 1 &&
                item.is_delete === 0
              ) {
                this.TodoList.push(item)
              }
            })
            localStorage.setItem('met', 'finishi')
            break
          }
          case 'delete': {
            this.TodoList = []
            JSON.parse(localStorage.getItem('todoList')).forEach((item) => {
              if (item.is_delete === 1) {
                this.TodoList.push(item)
              }
            })
            localStorage.setItem('met', 'delete')
            break
          }
        }
      }
    },
    // 删除
    async delItem (item) {
      console.log(item)
      item.is_delete = 1
      if (this.$store.state.Login === 1 && localStorage.getItem('token')) {
        delete item.new
        const { data: res } = await getTodolist.putTodolist(item)
        if (res.status === 200) {
          this.$notify({
            message: res.message,
            type: 'success',
            duration: 1000
          })
        } else {
          this.$notify({
            message: res.message,
            type: 'danger',
            duration: 1000
          })
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
      }
    },
    // 恢复
    AllrecDel (met) {
      if (localStorage.getItem('todoList').length !== 0) {
        if (localStorage.getItem('met') === 'all' && met === 'all') {
          this.$dialog
            .confirm({
              message: '确定全部完成吗？'
            })
            .then(() => {
              JSON.parse(localStorage.getItem('todoList')).forEach((item) => {
                if (item.finishi === 0 && item.upcoming === 0 && item.is_delete === 0) {
                  this.CheckOk(item.id, 'rec')
                }
              })
            })
        } else if (localStorage.getItem('met') === 'finishi' && met === 'all') {
          this.$dialog
            .confirm({
              message: '确定恢复吗？⚠仅能恢复最近10条'
            })
            .then(() => {
              let i = 0
              JSON.parse(localStorage.getItem('todoList')).forEach((item) => {
                i++
                if (i <= 10) {
                  if (item.is_delete === 0) {
                    if (item.finishi === 1 || item.upcoming === 1) {
                      this.CheckOk(item.id, 'rec')
                    }
                  }
                }
              })
            })
        } else if (met === 'delete') {
          this.$dialog
            .confirm({
              message: '确定全部删除吗？⚠此操作不可逆'
            })
            .then(() => {
              JSON.parse(localStorage.getItem('todoList')).forEach((item) => {
                if (item.is_delete === 0) {
                  this.delItem(item)
                }
              })
            })
          this.toget()
        }
      } else {
        this.$notify({
          message: '空空如也，快去添加你的代办吧!',
          type: 'danger',
          duration: 1000
        })
      }
      this.isall = !this.isall
    }
  },
  name: 'HomeModule',
  components: {
    todolist
  }
}
</script>

<style lang="less" scoped>
.content_body {
  width: 90%;
  // background-color: hsl(0deg 100% 95% / 40%);
  border-radius: 12px;
  //box-shadow: 0 0 30px rgb(0 0 0 / 15%);
  //box-shadow: 0 0 7px rgb(0 0 0 / 10%);;
  border: 0.5px solid black;
  position: absolute;
  padding: 20px 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  h1 {
    letter-spacing: 2px;
  }

  .inputArea {
    margin: 20px 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 12px;
    border: 1px solid black;
   // backdrop-filter: blur(50px);
   // box-shadow: 0 0 6px rgba(255, 206, 206, 0.8);
  }

  .Chekbox {
    display: inline-block;
    padding: 8px;
  }

  .inputBox {
    height: 1.2rem;
    width: 80%;
    border: 0;
  }

  .addBtn {
    width: 5rem;
    padding: 13px 10px;
    border: 0;
    border-radius: 20px;
    font-size: 1.2rem;
    font-weight: bolder;
    background-color: #fff;
  }

  .todoList {
    width: 100%;
    height: 50vh;
    overflow: scroll;
  }
}

.bottom_Count {
  display: flex;
  justify-content: space-between;
  padding: 8px 15px;
}

.Center_Count {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  width: 100%;
  align-items: center;

  >button {
    border: 0;
    padding: 10px 15px;
    border-radius: 10px;
    background: linear-gradient(to right bottom,
        rgba(255, 255, 255, 0.8),
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.3));
    border: 1px solid black;
  }
}

.isAllBox {
  display: flex;
  justify-content: space-between;
  padding: 8px 15px;
}
</style>
