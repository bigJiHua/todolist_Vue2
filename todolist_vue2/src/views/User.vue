<template>
  <div class="user-container">
    <!-- 用户基本信息面板 -->
    <div class="user-card">
      <ul class="van-cell">
        <li class="li_demo avatar">
          <img src="https://jihau.top/img/logo.png" alt="头像" />
        </li>
        <li v-if="isLogin" class="li_demo">
          <span class="username">欢迎{{ User }}</span>
        </li>
        <li v-if="!isLogin" class="li_demo">
          <router-link to="Login">点击登录</router-link>
        </li>
      </ul>
      <!-- 动态、关注、粉丝 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>{{$store.state.todoCount.finishi}}</span>
          <span>代办</span>
        </div>
        <div class="user-data-item">
          <span>{{$store.state.todoCount.upcoming}}</span>
          <span>已完成</span>
        </div>
        <div class="user-data-item">
          <span>{{$store.state.todoCount.is_delete}}</span>
          <span>删除</span>
        </div>
      </div>
    </div>
    <!-- 操作面板 -->
    <van-cell-group class="action-card" v-if="isLogin">
      <van-cell icon="warning-o" center title="是否上传到云端">
        <template #right-icon>
          <van-switch :value="checked" size="24" @click="toUpload" />
        </template>
      </van-cell>
      <van-cell icon="warning-o" title="退出登录" @click="logout" />
    </van-cell-group>
  </div>
</template>

<script>
import Upload from '@/components/API/getTodoList'
export default {
  props: [],
  data() {
    return {
      isLogin: localStorage.getItem('Username') ? true : false,
      User: localStorage.getItem('Username'),
      checked: false,
    }
  },
  created() {
    this.checked = parseInt(localStorage.getItem('Upload')) === 0 ? false : true
  },
  method() {},
  methods: {
    logout() {
      if (
        (localStorage.getItem('token') === null &&
          localStorage.getItem('Username') === null) ||
        localStorage.getItem('Login') === 0
      ) {
        alert('请登录后再试吧!')
      } else {
        this.$dialog
          .confirm({
            message: '确定退出登录吗？',
          })
          .then(() => {
            localStorage.clear()
            this.$router.push('/Home')
            location.reload()
          })
      }
    },
    async toUpload() {
      if (!this.checked) {
        this.$dialog
          .confirm({
            message: '开启上传云端后最多只能存放10条数据哦',
          })
          .then(() => {
            this.checked = true
            this.$store.commit('Upload', this.checked)
            localStorage.setItem('Upload', 1)
            this.Upload()
            if (this.$store.state.todo.length !== 0) {
              const newList = []
              this.$store.state.todo.forEach((item, index) => {
                if (index < 10) {
                  newList.push(item)
                }
              })
              this.$dialog
                .confirm({
                  message: '当前检测到代办列表有值，是否立即上传?',
                })
                .then(() => {
                  this.uploadd(newList)
                })
                .catch(() => {})
            }
          })
          .catch(() => {
            this.checked = false
          })
      } else {
        this.$dialog
          .confirm({
            message: '确定取消上传云端吗？',
          })
          .then(() => {
            this.checked = false
            this.$store.commit('Upload', this.checked)
            localStorage.setItem('Upload', 0)
            this.Upload()
          })
          .catch(() => {
            this.checked = true
          })
      }
    },
    async uploadd(todo) {
      const { data: res } = await Upload.addTodolist(todo)
      if (res.status === 200) {
        this.$notify({
          message: res.message,
          type: 'success',
          duration: 1000,
        })
      } else if (res.status === 406) {
        this.$notify({
          message: res.message,
          type: 'warning',
          duration: 1500,
        })
      } 
    },
    async Upload() {
      const { data: res } = await Upload.setUpload()
      if (res.status === 200) {
        this.$notify({
          message: res.message,
          type: 'success',
          duration: 1000,
        })
      }
    },
  },
  watch: {},
  computed: {},
  filters: {},
  name: 'User',
  components: {},
}
</script>

<style lang="less" scoped>
.user-container {
  .user-card {
    background: rgb(39, 93, 43);
    color: white;
    padding-top: 20px;
    .van-cell {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background: rgb(39, 93, 43);
      color: white;
      &::after {
        display: none;
      }
      .avatar {
        padding: 10px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 10px;
        img {
          width: 60px;
        }
      }
      .username {
        font-size: 1.8rem;
        font-weight: bold;
      }
      .li_demo a {
        color: white;
        font-size: 1.4rem;
      }
    }
  }
  .user-data {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
    padding: 30px 0;
    .user-data-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
    }
  }
}
</style>
