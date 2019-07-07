// routes/todo.js
const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

const { authenticated } = require('../config/auth')

// 設定 /todos 路由
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

router.post('/', authenticated, (req, res) => {
  const todo = new Todo({
    name: req.body.name
  })
  todo.save((err) => {
    if (err) return console.log(err)
    return res.redirect('/')
  })
})
//顯示一筆 Todo的詳細內容 3
router.get('/:id', authenticated, (req, res) => {
  //req.params.id
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err)
    return res.render('detail', { todo: todo })
  })
})

//修改Todo 頁面 5
router.get('/:id/edit', authenticated, (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    return res.render('edit', { todo: todo })
  })
})
//修改Todo 6
router.put('/:id', authenticated, (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    todo.name = req.body.name
    if (req.body.done) {
      todo.done = true
    } else {
      todo.done = false
    }
    todo.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/todos/${req.params.id}`)
    })
  })
})
//刪除Todo 7 
router.delete('/:id/delete', authenticated, (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    todo.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})



module.exports = router
