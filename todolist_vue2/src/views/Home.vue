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
          ></todolist>
        </van-pull-refresh>
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
      loading: false,
      count: 0,
    }
  },
  created() {
    if (this.$store.state.Login !== 0 && localStorage.getItem('Login')) {
      this.getlist()
      if (this.$store.state.todo.length !== 0) {
        this.TodoList = this.$store.state.todo
      }
      this.count++
      if (!this.$store.state.Upload && this.count <= 1) {
        setTimeout(() => {
          this.$notify({
            message: '当前未开启上传云端，刷新页面 后添加的数据会丢失',
            type: 'warning',
            duration: 1800,
          })
        }, 2000)
      }
    } else {
      this.TodoList = this.$store.state.todo
    }
    // 检查是否符合上传资格
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
  methods: {
    async getlist() {
      const { data: res } = await getTodolist.getTodolist()
      if (res.status !== 406) {
        this.$notify({
          message: res.message,
          type: 'success',
          duration: 1000,
        })
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
          this.$store.commit('todo', this.TodoList)
          this.newTodo = ''
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
    onRefresh() {
      this.getlist()
      this.loading = false
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
