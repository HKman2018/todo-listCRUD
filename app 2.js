const express = require('express')               // 載入 express
const app = express()
const exphbs = require('express-handlebars')                       // 啟用 
const mongoose = require('mongoose')
const Todo = require('./models/todo')
const session = require('express-session')
const passport = require('passport')

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//into methodOverride
const methodOverride = require('method-override')

//into bodyParser
const bodyParser = require('body-parser')


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

//setting method-override
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

//設定session 
app.use(session({
  secret: 'areyouswinngareyouswinng',
}))

app.use(passport.initialize())
app.use(passport.session())


require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

// 設定第一個首頁路由
app.use('/', require('./routes/home'))
app.use('/todos', require('./routes/todo'))
app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auths'))




// 設定 express port 3000
app.listen(3000, () => {
  console.log('App is running!!!!!!!!!x')
})
