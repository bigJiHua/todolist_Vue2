import request from '@/API/request'
const LoginMenu = function (username, password) {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  return request.post('/my/login', params)
}

// 新增用户
const UpnewUser = function (userdata) {
  console.log(userdata)
  const params = new URLSearchParams()
  params.append('username', userdata.username)
  params.append('password', userdata.password)
  return request.post('/my/reguser', params)
}

export default {
  LoginMenu,
  UpnewUser
}
