import request from "../request/request"

const Login = function (data) {
  const Params = new URLSearchParams()
  Params.append('username', data.username)
  Params.append('password', data.password)
  return request.post('/my/login', Params)
}

const reguser = function (data) {
  const Params = new URLSearchParams()
  Params.append('username', data.username)
  Params.append('password', data.password)
  return request.post('/my/reguser', Params)
}

export default {
  Login,
  reguser
}