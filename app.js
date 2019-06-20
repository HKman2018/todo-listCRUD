const express = require('express')               // 載入 express
const app = express()
const exphbs = require('express-handlebars')                       // 啟用 
const mongoose = require('mongoose')
const Todo = require('./models/todo')
const bodyParser = require('body-parser')


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

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
  Todo.find((err, todos) => {
    if (err) return console.error(err)
    return res.render('index', { todos: todos })
  })
})
//列出全部 Todo 1
app.get('/todos', (req, res) => {
  res.send('列出所有Todo')
})

//新增一筆 Todo頁面 2
app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const todo = new Todo({
    name: req.body.name
  })
  todo.save((err) => {
    if (err) return console.log(err)
    return res.redirect('/')
  })
})
//顯示一筆 Todo的詳細內容 3
app.get('/todos/:id', (req, res) => {
  //req.params.id
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err)
    return res.render('detail', { todo: todo })
  })
})

//修改Todo 頁面 5
app.get('/todos/:id/edit', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    return res.render('edit', { todo: todo })
  })
})
//修改Todo 6
app.post('/todos/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    todo.name = req.body.name
    todo.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/todos/${req.params.id}`)
    })
  })
})
//刪除Todo 7 
app.post('/todos/:id/delete', (req, res) => {
  res.send('刪除Todo')
})
// 設定 express port 3000
app.listen(3000, () => {
  console.log('App is running')
})
