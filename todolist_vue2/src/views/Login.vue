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
          <van-button @click="toback" class="Loginbtn">返回</van-button>
        </div>
      </div>
    </div>
    <van-popup v-model="show" round class="popup">{{ msg }}</van-popup>
  </div>
</template>

<script>
import PostLogin from '@/components/API/User'

export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      show: false,
      msg: '正在登录',
      setTime: 2000,
      rules: {
        username: {
          rule: /^\S/,
          msg: '用户名不能为空!且长度为6-12位',
        },
        password: {
          rule: /^\S{6,12}/,
          msg: '密码不能为空!且长度为6-12位',
        },
      },
    }
  },
  methods: {
    async login() {
      // 验证是否已经拥有token
      if (!localStorage.getItem('token')) {
        // 验证输入的用户名是否合法
        if (this.validata('username')) {
          // 验证输入的密码是否合法
          if (this.validata('password')) {
            // 发起请求
            const { data: res } = await PostLogin.LoginMenu(
              this.username,
              this.password
            )
            // 打开开关
            this.show = true
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
              const timer = setInterval(() => {
                this.msg = res.message
              }, 100)
              setTimeout(() => {
                clearInterval(timer)
                this.show = false
                this.loading = false
                this.$router.push('/User')
                location.reload()
              }, this.setTime)
            } else {
              this.showPopup(res.message)
            }
          }
        }
      } else {
        // 打开开关
        this.show = true
        this.loading = true
        const timer = setInterval(() => {
          this.msg = '已经登录啦！请勿重复提交表单！'
        }, 100)
        setTimeout(() => {
          clearInterval(timer)
          this.show = false
          this.loading = false
          this.$router.push('/User')
        }, this.setTime)
      }
    },
    register() {
      // 打开开关
      this.show = true
      this.loading = true
      if (localStorage.getItem('token')) {
        const timer = setInterval(() => {
          this.msg = '已经登录啦!'
        }, 100)
        setTimeout(() => {
          clearInterval(timer)
          this.show = false
          this.loading = false
          this.$router.push('/User')
        }, this.setTime)
      } else {
        this.$router.push('/register')
      }
    },
    validata(key) {
      let bool = true
      if (!this.rules[key].rule.test(this[key])) {
        this.show = true
        this.msg = this.rules[key].msg
        bool = false
        return false
      }
      return bool
    },
    showPopup(msg) {
      const timer = setInterval(() => {
        this.show = true
        this.msg = msg
      }, 100)
      setTimeout(() => {
        clearInterval(timer)
        this.show = false
        this.loading = false
      }, this.setTime)
    },
    toback() {
      this.$router.back()
    },
  },
  name: 'LoginPage',
}
</script>

<style scoped>
#logonCon {
  background-image: linear-gradient(
    to right top,
    #caf8ec,
    #94e1e2,
    #5ac7df,
    #18acdf,
    #008dd9,
    #5f80dd,
    #966dd3,
    #c254b9,
    #ff5495,
    #ff7468,
    #ffa63c,
    #f6d92a
  );
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
    color: rgb(240, 239, 244);
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
    color: rgb(240, 239, 244);
  }

  .login_lable:first-child {
    margin: 10px 0;
  }
  .login_lable {
    display: inline-block;
    width: 4rem;
    color: white;
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
  justify-content: space-around;
}
.Loginbtn {
  width: 5rem;
}
.popup {
  padding: 10px;
}
</style>
