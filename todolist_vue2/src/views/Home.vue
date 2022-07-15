<template>
  <div>
    <div class="content_body" id="content_body">
      <h1>I Want todo</h1>
      <div class="inputArea">
        <input
          type="text"
          class="inputBox"
          placeholder="输入要做的事"
          v-model="newTodo"
          @keydown.enter="addTodo"
        />
        <button class="addBtn" @click="addTodo">添加</button>
      </div>
      <div class="todoList">
        <todolist
          :isall="isall"
          v-for="(item, index) in TodoList"
          :key="index"
          :item="item"
          @delList="delList"
        ></todolist>
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
      isall: true,
      TodoList: [],
      newTodo: '',
      checkupl: false,
    }
  },
  created() {
    if (
      this.$store.state.Login !== 0 &&
      parseInt(localStorage.getItem('Login')) !== 0
    ) {
      this.getlist()
      if (this.$store.state.todo.length !== 0) {
        this.TodoList = this.$store.state.todo
      }
      if (!this.$store.state.Upload) {
        setTimeout(() => {
          this.$notify({
            message: '当前读取的是本地代办，刷新页面将会丢失',
            type: 'warning',
            duration: 1800,
          })
        }, 2000)
      }
    } else {
      this.TodoList = this.$store.state.todo
    }
    if (
      this.$store.state.Login !== 0 &&
      parseInt(localStorage.getItem('Login')) !== 0 &&
      this.$store.state.Upload &&
      parseInt(localStorage.getItem('Upload')) !== 0
    ) {
      this.checkupl = true
    } else {
      this.checkupl = false
    }
  },
  methods: {
    async getlist() {
      const { data: res } = await getTodolist.getTodolist()
      if (res.status !== 406) {
        this.$notify({
          message: res.message,
          type: 'success',
          duration: 1000,
        })
        console.log(res)
        const dataArry = res.data
        this.TodoList = dataArry.reverse()
        this.$store.commit('todo', res.data)
      } else {
        this.$notify({
          message: res.message,
          type: 'primary',
          duration: 1000,
        })
      }
    },
    addTodo() {
      if (this.newTodo !== '' && this.newTodo.length !== 0) {
        const todo = {
          todo: this.newTodo,
          upcoming: 0,
        }
        this.TodoList.push(todo)
        this.$store.commit('todo', this.TodoList)
        this.newTodo = ''
        setTimeout(async () => {
          if (this.checkupl) {
            const { data: res } = await getTodolist.addTodolist(todo)
            console.log(res)
            if (res.status === 200) {
              this.$notify({
                message: res.message,
                type: 'success',
                duration: 1000,
              })
              this.getlist()
            } else {
              this.$notify({
                message: res.message,
                type: 'danger',
                duration: 1000,
              })
              this.getlist()
            }
          }
        }, 800)
      } else {
        alert('輸入的值不能爲空哦！')
      }
    },
    async patchList() {
      if (
        this.$store.state.Login !== 0 &&
        parseInt(localStorage.getItem('Login')) !== 0
      ) {
        const { data: res } = await getTodolist.putTodolist(data)
        this.getlist()
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
</style>
