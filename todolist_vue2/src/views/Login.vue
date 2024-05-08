<template>
  <div id="logonCon" class="container">
    <div class="login_conten_box">
      <img
        class="login_img"
        src="https://jihau.top/api/public/uploads/undraw_Login_re_4vu2.png"
      />
      <div class="user_input_eara">
        <h2>登录 <small>Login</small></h2>
        <form class="form-horizontal">
          <label for="al_title" class="login_lable"> 用户名:</label>
          <input
            type="text"
            v-model="username"
            class="form-control login_input"
            placeholder="请输入用户名"
            require
          /><br />
          <label for="al_title" class="login_lable"> 密码:</label>
          <input
            type="password"
            class="form-control login_input"
            placeholder="请输入密码"
            required
            v-model="password"
            @keydown.enter="login"
          />
        </form>
        <div class="btnmenu">
          <van-button @click="register" class="Loginbtn">注册</van-button>
          <van-button @click="login" v-show="!loading" class="Loginbtn"
            >登录</van-button
          >
          <van-button
            loading
            type="primary"
            loading-text="登录中..."
            v-show="loading"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostLogin from '@/API/User'
import { Notify } from 'vant'

export default {
  data () {
    return {
      username: '',
      password: '',
      loading: false,
      msg: '正在登录',
      setTime: 2000,
      rules: {
        username: {
          rule: /^\S/,
          msg: '用户名不能为空!且长度为6-12位'
        },
        password: {
          rule: /^\S{6,12}/,
          msg: '密码不能为空!且长度为6-12位'
        }
      }
    }
  },
  methods: {
    async login () {
      // 验证是否已经拥有token
      if (!localStorage.getItem('token')) {
        // 验证输入的用户名是否合法
        if (this.validata('username')) {
          // 验证输入的密码是否合法
          if (this.validata('password')) {
            // 发起请求
            const { data: res } = await PostLogin.LoginMenu(this.username, this.password)
            // 打开开关
            this.loading = true
            // 判断返回状态码是否成功
            if (res.status === 200) {
              localStorage.setItem('Login', 1)
              localStorage.setItem('token', res.token)
              localStorage.setItem('Username', res.data.username)
              localStorage.setItem('pic', res.data.pic)
              localStorage.setItem('Upload', res.data.upload)
              localStorage.setItem('toChange', res.data.toChange)
              this.$store.commit('Upload', res.data.upload)
              setTimeout(() => {
                this.loading = false
                this.$router.push('/')
                location.reload()
              }, this.setTime)
            }
          }
        }
      } else {
        // 打开开关
        this.loading = true
        const timer = setInterval(() => {
          this.msg = '已经登录啦！请勿重复提交表单！'
        }, 100)
        setTimeout(() => {
          clearInterval(timer)
          this.loading = false
          this.$router.push('/User')
        }, this.setTime)
      }
    },
    register () {
      // 打开开关
      this.loading = true
      if (localStorage.getItem('token')) {
        const timer = setInterval(() => {
          this.msg = '已经登录啦!'
        }, 100)
        setTimeout(() => {
          clearInterval(timer)
          this.loading = false
          this.$router.push('/User')
        }, this.setTime)
      } else {
        this.$router.push('/register')
      }
    },
    validata (key) {
      let bool = true
      if (!this.rules[key].rule.test(this[key])) {
        Notify({ type: 'warning', position: 'top', message: this.rules[key].msg })
        bool = false
        return false
      }
      return bool
    }
  },
  name: 'LoginPage'
}
</script>

<style scoped>
#logonCon {
  background-color: #fff;
}
* {
  margin: 0;
  padding: 0;
}

.login_conten_box {
  margin: 20vh auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (min-width: 755px) {
  .login_conten_box {
    background-color: rgba(244, 244, 244, 0.4);
    width: 55vw;
    border-radius: 12px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
  }

  .login_img {
    width: 50%;
    border-radius: 12px 0 0 12px;
  }

  .user_input_eara {
    width: 100%;
    padding: 20px 25px;
  }

  .user_input_eara > h2 {
    margin-bottom: 15px;
    font-weight: bolder;
  }

  .login_lable:first-child {
    margin: 10px 0;
  }

  .login_input {
    margin: 5px 0 20px 0;
  }

  .user_input_eara > form > [name='button'] {
    float: right;
  }
}

@media only screen and (max-width: 755px) {
  .login_conten_box {
    background-color: rgba(244, 244, 244, 0.4);
    width: 90vw;
    border-radius: 12px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  }
  .login_img {
    display: none;
  }
  .user_input_eara {
    padding: 15px;
  }
  .user_input_eara > h2 {
    margin-bottom: 15px;
    font-weight: bolder;
  }

  .login_lable:first-child {
    margin: 10px 0;
  }
  .login_lable {
    display: inline-block;
    width: 4rem;
    font-weight: bolder;
  }
  .login_input {
    margin: 0 0 25px 0;
    padding: 5px 10px;
    border-radius: 5px;
    border: 0;
    height: 1.8rem;
  }
}
.btnmenu {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.Loginbtn {
  width: 5rem;
}
.popup {
  padding: 10px;
}
</style>
