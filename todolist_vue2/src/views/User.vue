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
          <span>0</span>
          <span>代办</span>
        </div>
        <div class="user-data-item">
          <span>0</span>
          <span>已完成</span>
        </div>
        <div class="user-data-item">
          <span>0</span>
          <span>删除</span>
        </div>
      </div>
    </div>
    <!-- 操作面板 -->
    <van-cell-group class="action-card">
      <van-cell icon="warning-o" center title="是否上传到云端" v-if="isLogin">
        <template #right-icon>
          <van-switch v-model="checked" size="24" @click="toUpload" />
        </template>
      </van-cell>
      <van-cell icon="warning-o" title="退出登录" @click="logout" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      isLogin: localStorage.getItem('Username') ? true : false,
      User: localStorage.getItem('Username'),
      checked: parseInt(localStorage.getItem('Upload')) === 0 ? false : true,
    }
  },
  created() {},
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
        const condel = confirm('确定退出登录吗？')
        if (condel) {
          localStorage.removeItem('token')
          localStorage.removeItem('Username')
          localStorage.setItem('Login', 0)
          location.reload()
        }
      }
    },
    async toUpload() {
      // TODO 有Bug
      const condel = confirm('开启上传云端后最多只能存放10条数据哦!')
      if (condel) {
        this.checked = true
        localStorage.getItem('Upload', 1)
      } else {
        this.checked = false
        console.log(this.checked)
        localStorage.getItem('Upload', 0)
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
