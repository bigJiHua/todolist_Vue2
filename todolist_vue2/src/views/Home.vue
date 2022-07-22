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
            @delList="delList"
            @cagList="patchList"
            @CheckOk="CheckOk"
          ></todolist>
        </van-pull-refresh>
      </div>
      <div class="bottom_Count">
        <div class="Center_Count">
          <p><span>代办&nbsp;</span>{{ Count.todoCount }}</p>
          <p><span>&nbsp;完成&nbsp;</span>{{ Count.todoFinish }}</p>
          <p><span>&nbsp;删除&nbsp;</span>{{ Count.todoDelete }}</p>
        </div>
        <div class="checkBox">
          <van-button>&nbsp;清除已完成</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import todolist from '@/components/Module/List_item.vue'
import getTodolist from '@/components/API/getTodoList'
export default {
  props: [],
  data() {
    return {
      isall: false,
      TodoList: [],
      newTodo: '',
      checkupl: false,
      loading: false,
      count: 0,
      Count: {
        todoCount: 0,
        todoFinish: 0,
        todoDelete: 0,
      },
    }
  },
  created() {
    this.getlist()
    // 检查是否符合上传资格
    this.checkuplsc()
    if (localStorage.getItem('toChange') === null) {
      localStorage.setItem('toChange', 0)
    }
  },
  methods: {
    async getlist() {
      const { data: res } = await getTodolist.getTodolist()
      // 不等于空空如也时
      if (res.status !== 406) {
        this.$notify({
          message: res.message,
          type: 'success',
          duration: 1000,
        })
        localStorage.setItem('todoList', JSON.stringify(res.data.reverse()))
        this.TodoList = JSON.parse(localStorage.getItem('todoList'))
      } else {
        // 空空如也时
        if (localStorage.getItem('todoList')) {
          this.TodoList = JSON.parse(localStorage.getItem('todoList'))
        } else {
          this.$notify({
            message: res.message,
            type: 'primary',
            duration: 1000,
          })
        }
      }
    },
    addTodo() {
      if (this.newTodo !== '' && this.newTodo.length !== 0) {
        const todo = {
          id: this.TodoList.length,
          username: localStorage.getItem('Username'),
          todo: this.newTodo.substring(0, 25),
          finishi: 0,
          upcoming: 0,
          is_delete: 0,
          time: new Date().getTime(),
        }
        // 如果开启的上传云端
        setTimeout(async () => {
          if (this.checkupl) {
            const { data: res } = await getTodolist.addTodolist(todo)
            if (res.status === 200) {
              this.$notify({
                message: res.message,
                type: 'success',
                duration: 1000,
              })
              this.getlist()
            } else if (res.status === 406) {
              this.$notify({
                message: res.message,
                type: 'danger',
                duration: 1000,
              })
            }
          }
          this.TodoList.push(todo)
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
      } else if (res.status === 406) {
        this.$notify({
          message: res.message,
          type: 'danger',
          duration: 1000,
        })
      }
    },
    async delList(id) {
      if (
        this.$store.state.Login !== 0 &&
        parseInt(localStorage.getItem('Login')) !== 0
      ) {
        const { data: res } = await getTodolist.delTodolist(data)
        this.getlist()
      } else {
        const newArry = []
        this.TodoList.forEach((item) => {
          if (item.id !== id) {
            newArry.push(item)
          }
        })
        this.TodoList = newArry
      }
    },
    CheckOk(id) {
      const newDataArry = []
      this.TodoList.forEach((item) => {
        if (item.id === id && item.finishi === 0) {
          item.finishi = 1
          if (localStorage.getItem('Login')) {
            this.patchList(item)
          }
        } else {
          item.finishi = 0
          if (localStorage.getItem('Login')) {
            this.patchList(item)
          }
        }
        newDataArry.push(item)
      })
      this.TodoList = newDataArry
      localStorage.setItem('todoList', JSON.stringify(newDataArry))
    },
    onRefresh() {
      this.getlist()
      this.loading = false
    },
    checkuplsc() {
      if (
        this.$store.state.Login !== 0 &&
        parseInt(localStorage.getItem('Login')) !== 0 &&
        localStorage.getItem('Login') &&
        localStorage.getItem('Upload') &&
        this.$store.state.Upload &&
        parseInt(localStorage.getItem('Upload')) !== 0
      ) {
        this.checkupl = true
      } else {
        this.checkupl = false
      }
    },
    checkAll() {
      this.isall = !this.isall
    },
  },
  watch: {
    // TodoList: {
    //   handler(newVal) {
    //     this.Count.todoCount = 0
    //     newVal.forEach((item) => {
    //       if (item.finishi === 0) {
    //         console.log(item)
    //         this.Count.todoCount += 1
    //       } else {
    //         this.Count.todoCount -= 1
    //       }
    //     })
    //   },
    //   immediate: true,
    //   deep: true,
    // },
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
