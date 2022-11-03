<template>
  <div id="logonCon" class="container">
    <div class="login_conten_box">
      <div class="user_input_eara">
        <h2>注册 <small>Register</small></h2>
        <p class="newuser">用户名:<small class="wran">⚠必填</small></p>
        <input
          type="text"
          v-model="newUser.username"
          class="form-control login_input"
          placeholder="请输入用户名 (6-12位且唯一)"
          required
        />
        <p class="newuser">头像</p>
        <small class="wran">(⚠ 只支持链接或者Base64编码格式)</small>
        <input
          type="text"
          v-model="newUser.pic"
          class="form-control login_input"
          placeholder="粘贴用户头像Link"
          required
        />
        <p class="newuser">密码:<small class="wran">⚠必填</small></p>
        <input
          type="password"
          class="form-control login_input"
          placeholder="请输入密码 (6-12位)"
          required
          v-model="newUser.password"
        />
        <p class="newuser">确认密码:<small class="wran">⚠必填</small></p>
        <input
          type="password"
          class="form-control login_input"
          placeholder="请输重新输入确认密码"
          required
          v-model="elsepassword"
        />
        <div class="btnmenu">
          <van-button @click="comback" class="Loginbtn">返回</van-button>
          <van-button @click="newuser" v-show="!loading" class="Loginbtn"
            >注册</van-button
          >
          <van-button
            loading
            type="primary"
            loading-text="注册中..."
            v-show="loading"
          />
        </div>
      </div>
    </div>
    <van-popup v-model="show" round class="popup">{{ msg }}</van-popup>
  </div>
</template>

<script>
import PostNewUser from '@/components/API/User'
export default {
  data () {
    return {
      loading: false,
      showup: false,
      show: false,
      msg: '',
      elsepassword: '',
      newUser: {
        username: '',
        password: '',
        pic: ''
      },
      rules: {
        username: {
          rule: /^\w{6,12}$/,
          msg: '用户名必须为字母开头6-12位'
        },
        password: {
          rule: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
          msg: '密码不能位空,必须为8-16位非空、非纯字符密码'
        }
      }
    }
  },
  methods: {
    async newuser () {
      this.loading = !this.loading
      if (this.validata('username')) {
        if (this.validata('password')) {
          if (this.newUser.password === this.elsepassword) {
            const { data: res } = await PostNewUser.UpnewUser(this.newUser)
            if (res.status !== 202) {
              const timer = setInterval(() => {
                this.show = true
                this.msg = res.message
              }, 100)
              setTimeout(() => {
                clearInterval(timer)
                this.show = false
                this.loading = false
                this.$router.push('/Login')
              }, 2000)
            }
          } else this.showPopup('两次密码不一致，请检查')
        }
      }
    },
    validata (key) {
      let bool = true
      if (!this.rules[key].rule.test(this.newUser[key])) {
        this.showPopup(this.rules[key].msg)
        bool = false
        return false
      }
      return bool
    },
    showPopup (msg) {
      const timer = setInterval(() => {
        this.show = true
        this.msg = msg
      }, 100)
      setTimeout(() => {
        clearInterval(timer)
        this.show = false
        this.loading = false
      }, 2000)
    },
    comback () {
      this.$dialog
        .confirm({
          message: '放弃注册吗？'
        })
        .then(async () => {
          this.$router.back()
        })
    }
  },
  name: 'RegisterPage'
}
</script>

<style scoped>
#logonCon {
  position: relative;
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
@media only screen and (min-width: 755px) {
  .login_conten_box {
    margin: 20vh auto;
    width: 60vw;
    background-color: rgba(244, 244, 244, 0.4);
    border-radius: 12px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  }

  .user_input_eara {
    padding: 20px 25px;
    width: 100%;
  }

  .user_input_eara > h2 {
    margin-bottom: 15px;
    font-weight: bolder;
    color: rgb(240, 239, 244);
  }

  .newuser:first-child {
    margin: 10px 0;
  }

  .login_input {
    margin: 5px 0 20px 0;
  }

  .user_input_eara > form > [name='button'] {
    float: right;
  }
  .select_city {
    width: 8vw;
  }
  .fileup {
    width: 100%;
    height: 70%;
    border: 136px rgba(0, 45, 207, 0.8) ridge;
  }
}

@media only screen and (max-width: 755px) {
  .login_conten_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(244, 244, 244, 0.4);
    border-radius: 12px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  }
  .user_input_eara {
    width: 75vw;
    padding: 10px 25px;
  }
  .user_input_eara > h2 {
    margin-bottom: 15px;
    font-weight: bolder;
    color: rgb(240, 239, 244);
  }
  .login_input {
    margin: 5px 0 20px 0;
  }
  .select_city,
  .select {
    width: 35vw;
  }
  .fileup {
    width: 100%;
    height: 70%;
    border: 123px rgba(0, 45, 207, 0.8) ridge;
  }
}
.newuser {
  color: #0049c7;
  font-size: 1.5rem;
  font-weight: bolder;
}
.wran {
  color: red;
  font-size: 0.8rem;
}
.btnmenu {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
}
.selectsex {
  margin: 0 20px 0 20px;
}
.selectcity {
  display: flex;
}
.wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.cagarea {
  width: 60vw;
  height: 45vh;
  background-color: #fff;
  text-align: center;
  border-radius: 12px;
}
.Loginbtn {
  width: 5rem;
}
.login_input {
  margin: 18px 0;
  width: 93%;
  padding: 5px 10px;
  border-radius: 5px;
  border: 0;
  height: 1.8rem;
}
.popup {
  padding: 10px;
}
</style>
