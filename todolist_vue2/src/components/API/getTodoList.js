import request from "../request/request"

const getTodolist = function () {
  return request.get('/todolist')
}
const addTodolist = function (data) {
  const Params = new URLSearchParams()
  Params.append('todo', data)
  Params.append('tf', false)
  return request.post('/todolist', Params)
}
const delTodolist = function (id) {
  const data = id
  return request.delete('/todolist/'+ data)
}
const putTodolist = function (data) {
  const Params = new URLSearchParams()
  Params.append('todo', data)
  Params.append('tf', false)
  return request.patch('/todolist', Params)
}

export default {
  getTodolist,
  addTodolist,
  delTodolist,
  putTodolist
}