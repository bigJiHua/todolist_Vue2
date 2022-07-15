import request from '../request/request'

const getTodolist = function () {
  return request.get('/api/todolist?user=' + localStorage.getItem('Username'))
}
const addTodolist = function (data) {
  const Params = new URLSearchParams()
  Params.append('username', localStorage.getItem('Username'))
  Params.append('todo', data.todo)
  return request.post('/api/addtodo', Params)
}
const putTodolist = function (data) {
  const Params = new URLSearchParams()
  Params.append('username', localStorage.getItem('Username'))
  Params.append('todo', data)
  return request.patch('/api/cagtodo', Params)
}

const setUpload = function () {
  const Params = new URLSearchParams()
  Params.append('username', localStorage.getItem('Username'))
  Params.append('upload', localStorage.getItem('Upload'))
  return request.patch('/api/isupl', Params)
}

const delTodolist = function (id) {
  const Params = new URLSearchParams()
  Params.append('username', localStorage.getItem('Username'))
  Params.append('id', id)
  return request.delete('/api/deltodo', Params)
}

export default {
  getTodolist,
  addTodolist,
  putTodolist,
  delTodolist,
  setUpload,
}
