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
    }
  },
  created() {
    if (
      this.$store.state.Login !== 0 &&
      parseInt(localStorage.getItem('Login')) !== 0
    ) {
      this.getlist()
    } else {
      this.TodoList = this.$store.state.todo
      localStorage.setItem('Login', 0)
    }
  },
  methods: {
    async getlist() {
      const { data: res } = await getTodolist.getTodolist()
      const dataArry = res
      this.TodoList = dataArry.reverse()
    },
    async addTodo() {
      if (
        this.$store.state.Login !== 0 &&
        parseInt(localStorage.getItem('Login')) !== 0
      ) {
        await getTodolist.addTodolist(this.newTodo)
        this.getlist()
        this.newTodo = ''
      } else {
        if (this.newTodo !== '' && this.newTodo.length !== 0) {
          const todo = {
            id: this.TodoList.length + 1,
            todo: this.newTodo,
            upcoming: 0,
          }
          this.TodoList.push(todo)
          this.$store.commit('todo', this.TodoList)
          this.newTodo = ''
        } else {
          alert('輸入的值不能爲空哦！')
        }
      }
    },
    async getList(id) {
      if (
        this.$store.state.Login !== 0 &&
        parseInt(localStorage.getItem('Login')) !== 0
      ) {
        const { data: res } = await getTodolist.delTodolist(id)
        this.getlist()
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
