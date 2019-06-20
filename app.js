const express = require('express')               // 載入 express
const app = express()                            // 啟用 express
const mongoose = require('mongoose')
const Todo = require('./models/todo')

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true })

// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定第一個首頁路由
app.get('/', (req, res) => {
  res.send('hello world')
})
//列出全部 Todo 1
app.get('/todos', (req, res) => {
  res.send('列出所有Todo')
})

//新增一筆 Todo頁面 2
app.get('/todos/new', (req, res) => {
  res.send('新增Todo頁面')
})
//顯示一筆 Todo的詳細內容 3
app.get('/todos/:id', (req, res) => {
  res.send('顯示Todo的詳細內容')
})
//新增一筆 Todo  4
app.get('/todos', (req, res) => {
  res.send('建立Todo')
})
//修改Todo 頁面 5
app.get('/todos/:id/edit', (req, res) => {
  res.send('修改Todo頁面')
})
//修改Todo 6
app.post('/todos/:id', (req, res) => {
  res.send('修改Todo')
})
//刪除Todo 7 
app.post('/todos/:id/delete', (req, res) => {
  res.send('刪除Todo')
})
// 設定 express port 3000
app.listen(3000, () => {
  console.log('App is running')
})
