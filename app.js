const express = require('express')               // 載入 express
const app = express()
const exphbs = require('express-handlebars')                       // 啟用 
const mongoose = require('mongoose')
const Todo = require('./models/todo')


//into methodOverride
const methodOverride = require('method-override')

//into bodyParser
const bodyParser = require('body-parser')


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

//setting method- override
app.use(methodOverride('_method'))
//mongoose connected
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

app.use('/', require('./routes/home'))
app.use('/todos', require('./routes/todo'))
app.use('/users', require('./routes/users'))





// 設定 express port 3000
app.listen(3000, () => {
  console.log('App is running')
})
