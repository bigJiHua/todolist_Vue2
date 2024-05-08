<template>
  <div class="user-container">
    <!-- 用户基本信息面板 -->
    <div class="user-card">
      <ul class="UserPanel">
        <li class="li_demo avatar">
          <img :src="pic" alt="头像" v-if="pic" />
          <img src="https://jihau.top/img/logo.png" alt="头像" v-else />
        </li>
        <li v-if="isLogin" class="li_demo">
          <span class="username">{{ User }}</span>
        </li>
        <li v-if="!isLogin" class="li_demo">
          <router-link to="Login">点击登录</router-link>
        </li>
      </ul>
      <!-- 代办 完成 删除 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>{{ Count.finishi }}</span>
          <span>代办</span>
        </div>
        <div class="user-data-item">
          <span>{{ Count.upcoming }}</span>
          <span>已完成</span>
        </div>
        <div class="user-data-item">
          <span>{{ Count.is_delete }}</span>
          <span>删除</span>
        </div>
      </div>
    </div>
    <!-- 操作面板 -->
    <van-cell-group class="action-card">
      <van-cell icon="upgrade" center title="是否上传到云端" v-if="isLogin">
        <template #right-icon>
          <van-switch :value="checked" size="24" @click="toUpload" />
        </template>
      </van-cell>
      <van-cell icon="records" center title="是否双击修改">
        <template #right-icon>
          <van-switch :value="change" size="24" @click="toChange" />
        </template>
      </van-cell>
      <van-cell icon="delete-o" title="清除本地记录" @click="clearTodoList" />
      <van-cell
        icon="warning-o"
        title="退出登录"
        @click="logout"
        v-if="isLogin"
      />
      <van-cell icon="notes-o" title="功能介绍" @click="notes"/>
    </van-cell-group>
  </div>
</template>

<script>
import Setting from '@/API/getTodoList'
export default {
  props: [],
  data () {
    return {
      isLogin: !!localStorage.getItem('Username'),
      User: localStorage.getItem('Username'),
      pic: localStorage.getItem('pic'),
      checked: localStorage.getItem('Upload') !== '0',
      change: this.$store.state.toChange,
      length: 0,
      TodosData: [],
      Count: {
        finishi: this.$store.state.Count.finishi,
        upcoming: this.$store.state.Count.upcoming,
        is_delete: this.$store.state.Count.is_delete
      }
    }
  },
  created () {
    if (
      localStorage.getItem('Username') === '' &&
      localStorage.getItem('token') === ''
    ) {
      this.overLogin()
    }
  },
  methods: {
    logout () {
      if (
        (localStorage.getItem('token') === null &&
          localStorage.getItem('Username') === null) ||
        localStorage.getItem('Login') === 0
      ) {
        alert('请登录后再试吧!')
      } else {
        this.$dialog
          .confirm({
            message: '确定退出登录吗？'
          })
          .then(() => {
            localStorage.removeItem('Login')
            localStorage.removeItem('Upload')
            localStorage.removeItem('toChange')
            localStorage.removeItem('Count')
            localStorage.removeItem('token')
            localStorage.removeItem('Username')
            this.$router.push('/')
            location.reload()
          })
      }
    },
    async toUpload () {
      this.checked = !this.checked
      if (this.checked) {
        this.$dialog
          .confirm({
            message: '开启上传云端后最多只能存放10条数据哦'
          })
          .then(() => {
            localStorage.setItem('Upload', 1)
            this.Upload()
            if (localStorage.getItem('todoList')) {
              this.$dialog
                .confirm({
                  message: '当前检测到本地代办列表有值，是否立即上传?'
                })
                .then(() => {
                  const localData = JSON.parse(localStorage.getItem('todoList'))
                  // 如果当前用户在云端数据为0 则新插入数据
                  localData.forEach((item, index) => {
                    if (item.new && item.new === true && item.finishi === 0) {
                      delete item.id
                      delete item.new
                      this.uploadd(item)
                    } else if (item.is_delete === 1) {
                      localData.splice(index, 1)
                      console.log(localData)
                    }
                  })
                })
            }
          })
          .catch(() => {
            this.checked = !this.checked
            localStorage.setItem('Upload', 0)
          })
      } else {
        this.$dialog
          .confirm({
            message: '确定取消上传云端吗？'
          })
          .then(() => {
            localStorage.setItem('Upload', 0)
            this.Upload()
          })
          .catch(() => {
            this.checked = !this.checked
            localStorage.setItem('Upload', 1)
          })
      }
    },
    async toChange () {
      this.change = !this.change
      if (this.change) {
        localStorage.setItem('toChange', 1)
      } else {
        localStorage.setItem('toChange', 0)
      }
      if (
        localStorage.getItem('Login') === 1 &&
        localStorage.getItem('token')
      ) {
        const { data: res } = await Setting.setSetting(
          'toChange',
          localStorage.getItem('toChange')
        )
        if (res.status === 200) {
          this.$notify({
            message: res.message,
            type: 'success',
            duration: 1000
          })
          location.reload()
        }
      }
      location.reload()
    },
    async uploadd (todo) {
      if (todo !== undefined) {
        const { data: res } = await Setting.addTodolist(todo)
        if (res.status === 200) {
          this.$notify({
            message: res.message,
            type: 'success',
            duration: 1000
          })
        } else if (res.status === 406) {
          this.$notify({
            message: res.message,
            type: 'warning',
            duration: 1500
          })
        }
      } else {
        this.$notify({
          message: 'undefined',
          type: 'warning',
          duration: 1500
        })
      }
    },
    async Upload () {
      const { data: res } = await Setting.setSetting(
        'upload',
        localStorage.getItem('Upload')
      )
      if (res.status === 200) {
        this.$notify({
          message: res.message,
          type: 'success',
          duration: 1000
        })
        this.TodosData = res.data
        this.length = this.TodosData.length
      }
    },
    overLogin () {
      localStorage.removeItem('Login')
      localStorage.removeItem('Upload')
      localStorage.removeItem('toChange')
      localStorage.removeItem('Count')
      localStorage.removeItem('token')
      localStorage.removeItem('Username')
      this.$router.push('/Login')
      location.reload()
    },
    clearTodoList () {
      if (localStorage.getItem('todoList') !== null) {
        this.$dialog
          .confirm({
            message: '确定清除本地记录吗？数据同步后依然存在嗷!'
          })
          .then(async () => {
            localStorage.removeItem('todoList')
          })
      }
    },
    notes () {
      this.$router.push('notes')
    }
  },
  watch: {},
  computed: {},
  name: 'UserM',
  components: {}
}
</script>

<style lang="less" scoped>
.user-container {
  .user-card {
    background: #abababc2;
    color: white;
    padding-top: 20px;
    .UserPanel {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: white;
      &::after {
        display: none;
      }
      .avatar {
        padding: 10px;
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
