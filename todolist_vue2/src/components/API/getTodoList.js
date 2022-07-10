import request from "../request/request"

const getTodolist = function () {
  return request.get('/todolist')
}
const addTodolist = function () {
  return request.post('/todolist')
}
const delTodolist = function () {
  return request.delete('/todolist')
}

export default {
  getTodolist,
  addTodolist,
  delTodolist
}