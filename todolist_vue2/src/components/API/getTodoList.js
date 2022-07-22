import request from '../request/request'
// 获取代办列表
const getTodolist = function () {
  return request.get('/api/todolist?user=' + localStorage.getItem('Username'))
}
// 新增代办列表
const addTodolist = function (data) {
  delete data.id
  const Params = new URLSearchParams()
  Params.append('username', localStorage.getItem('Username'))
  Params.append('todo', JSON.stringify(data))
  return request.post('/api/addtodo', Params)
}
// 删除代办列表
const delTodolist = function (id) {
  const Params = new URLSearchParams()
  Params.append('username', localStorage.getItem('Username'))
  Params.append('id', id)
  return request.delete('/api/deltodo', Params)
}
// 修改代办列表
const putTodolist = function (data) {
  const Params = new URLSearchParams()
  Params.append('username', localStorage.getItem('Username'))
  Params.append('ctodo', JSON.stringify(data))
  return request.patch('/api/cagtodo', Params)
}
// 设置是否开启上传
const setSetting = function (met,set) {
  const Params = new URLSearchParams()
  Params.append('met', met)
  Params.append('username', localStorage.getItem('Username'))
  Params.append('settings', set)
  return request.patch('/api/Setting', Params)
}
export default {
  getTodolist,
  addTodolist,
  putTodolist,
  delTodolist,
  setSetting,
}
