import request from '../request/request'
const LoginMenu = function (username, password) {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  return request.post('/my/login', params, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

// 新增用户
const UpnewUser = function (userdata) {
  console.log(userdata)
  const params = new URLSearchParams()
  params.append('username', userdata.username)
  params.append('password', userdata.password)
  return request.post('/my/reguser', params, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}
export default {
  LoginMenu,
  UpnewUser
}