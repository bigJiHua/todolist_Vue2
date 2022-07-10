<template>
  <div>
    <div class="content_body" id="content_body">
      <h1>I Want todo</h1>
      <div class="inputArea">
        <input type="text" class="inputBox" placeholder="输入要做的事" v-model="newTodo"/>
        <button class="addBtn" @click="addTodo">添加</button>
      </div>
      <div class="todoList">
        <todolist :isall="isall" v-for="(item,index) in TodoList" :key="index" :item="item"></todolist>
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
      TodoList: []
    }
  },
  created () {
    this.getlist()
  },
  methods: {
    async getlist () {
      const { data:res } = await getTodolist.getTodolist()
      this.TodoList = res
    },
    async addTodo () {
      const { data: res } = await getTodolist.addTodolist()
      console.log(res)
    }
  },
  // 监听器
  watch: {},
  // 当前组件的计算属性
  computed: {},
  // 过滤器
  filters: {},
  // Vue 中自定义属性
  directives: {},
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
