<template>
  <div>
    <div class="content_body" id="content_body">
      <h1>I Want todo</h1>
      <div class="inputArea">
        <van-icon name="arrow-down" class="Chekbox" @click="checkAll()" />
        <input
          type="text"
          class="inputBox"
          placeholder="输入要做的事 (Limit 25)"
          v-model="newTodo"
          @keydown.enter="addTodo"
        />
        <button class="addBtn" @click="addTodo">添加</button>
      </div>
      <div class="todoList">
        <van-pull-refresh
          v-model="loading"
          success-text="刷新成功"
          @refresh="onRefresh"
        >
          <todolist
            :isall="isall"
            v-for="(item, index) in TodoList"
            :key="index"
            :item="item"
            @cagList="patchList"
            @CheckOk="CheckOk"
            @toget="toget"
          ></todolist>
        </van-pull-refresh>
      </div>
      <div class="bottom_Count">
        <div class="Center_Count">
          <p>
            <span @click="CountNum('all')">代办&nbsp;</span>{{ Count.upcoming }}
          </p>
          <p>
            <span @click="CountNum('finishi')">&nbsp;完成&nbsp;</span
            >{{ Count.finishi }}
          </p>
          <p>
            <span @click="CountNum('delete')">&nbsp;删除&nbsp;</span
            >{{ Count.is_delete }}
          </p>
        </div>
        <div class="checkBox">
          <van-button @click="CountNum('remsinishi')"
            >&nbsp;清除已完成</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import todolist from '@/components/Module/List_item.vue'
import getTodolist from '@/components/API/getTodoList'
export default {
  data() {
    return {
      isall: false,
      TodoList: [],
      newTodo: '',
      checkupl: localStorage.getItem('Upload') === 0 ? false : true,
      loading: false,
      count: 0,
      Count: {
        finishi: this.$store.state.Count.finishi,
        upcoming: this.$store.state.Count.upcoming,
        is_delete: this.$store.state.Count.is_delete,
      },
    }
  },
  created() {
    this.getlist()
    if (localStorage.getItem('toChange') === null) {
      localStorage.setItem('toChange', 0)
    }
  },
  methods: {
    async getlist() {
      if (parseInt(localStorage.getItem('Login')) === 1) {
        const { data: res } = await getTodolist.getTodolist()
        if (res.status !== 406) {
          this.$notify({
            message: res.message,
            type: 'success',
            duration: 1500,
          })
          this.$store.dispatch('CountData', this.Count)
          localStorage.setItem('todoList', JSON.stringify(res.data.reverse()))
        } else {
          this.$notify({
            message: '云端空空如也，当前获取的是本地数据',
            type: 'primary',
            duration: 1000,
          })
        }
      } else if(parseInt(localStorage.getItem('Login')) === 0 || !localStorage.getItem('Login')) {
        if(localStorage.getItem('todoList') && localStorage.getItem('todoList').length > 0) {
          this.TodoList = JSON.parse(localStorage.getItem('todoList'))
        } else {
          this.$notify({
            message: '空空如也',
            type: 'primary',
            duration: 1000,
          })
        }
      }
      this.CountNum(localStorage.getItem('met'))
    },
    addTodo() {
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
          new: true,
        }
        // 如果开启的上传云端
        setTimeout(async () => {
          if (this.checkupl && localStorage.getItem('Username') && localStorage.getItem('Upload')) {
            delete todo.new
            const { data: res } = await getTodolist.addTodolist(todo)
            if (res.status === 200) {
              this.$notify({
                message: res.message,
                type: 'success',
                duration: 1000,
              })
              setTimeout(() => {
                this.getlist()
              }, 1000)
            } else if (res.status === 406) {
              this.$notify({
                message: res.message,
                type: 'danger',
                duration: 1000,
              })
            }
          } else {
            this.TodoList.push(todo)
            this.$notify({
              message: '添加成功',
              type: 'success',
              duration: 2000,
            })
            console.log(todo, this.TodoList)
          }
          localStorage.setItem('todoList', JSON.stringify(this.TodoList))
          this.newTodo = ''
        }, 800)
      } else {
        alert('輸入的值不能爲空哦！')
      }
    },
    async patchList(data) {
      const { data: res } = await getTodolist.putTodolist(data)
      if (res.status === 200) {
        this.$notify({
          message: res.message,
          type: 'success',
          duration: 1000,
        })
      } else if (res.status === 202) {
        this.$notify({
          message: res.message,
          type: 'danger',
          duration: 1000,
        })
      }
    },
    CheckOk(id) {
      this.$dialog
        .confirm({
          message: '要进行变更吗？',
        })
        .then(async () => {
          const newDataArry = []
          JSON.parse(localStorage.getItem('todoList')).forEach((item) => {
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
          }, 2200)
        })
        .catch(() => {
          this.getlist()
        })
    },
    onRefresh() {
      this.getlist()
      this.loading = false
      this.CountNum(localStorage.getItem('met'))
    },
    checkAll() {
      this.isall = !this.isall
    },
    toget() {
      this.getlist()
    },
    CountNum(met) {
      // 有Bug 本地数据会消失
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
                (item.is_delete === 0 &&
                  item.upcoming === 0 &&
                  item.is_delete === 0) ||
                (item.finishi === 1 &&
                  item.upcoming === 1 &&
                  item.is_delete === 0)
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
          case 'remsinishi': {
            this.TodoList = []
            JSON.parse(localStorage.getItem('todoList')).forEach((item) => {
              if (item.finishi === 0 && item.is_delete === 0) {
                this.TodoList.push(item)
              }
            })
            localStorage.setItem('met', 'remsinishi')
            break
          }
        }
      }
    },
  },
  name: 'Home',
  components: {
    todolist,
  },
}
</script>

<style lang="less" scoped>
.content_body {
  width: 90%;
  background-color: rgba(216, 216, 216, 0.4);
  box-shadow: 5px 6px 5px #888888;
  position: absolute;
  padding: 10px 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  h1 {
    letter-spacing: 2px;
  }
  .inputArea {
    margin: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    padding-left: 10px;
    border-radius: 20px;
  }
  .inputBox {
    height: 100%;
    width: 80%;
    border-radius: 20px;
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
.checkBox {
  display: flex;
  justify-content: center;
  align-items: center;
  .Chekbox {
    height: 21px;
    width: 21px;
  }
}
.Center_Count {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
