const express = require('express')
const expressHandlebars = require('express-handlebars')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const csrf = require('csurf')
const flash = require('connect-flash')

const { NODE_ENV, SESSION_SECRET } = require('../config/variables')
const db = require('../config/database')
const helpers = require('./helpers/handlebars')

const homeRoute = require('./routes/home')
const authRoutes = require('./routes/auth')
const courseRoutes = require('./routes/course')
const cartRoutes = require('./routes/cart')

const localsMiddleware = require('./middlewares/locals')

const app = express()

if (NODE_ENV !== 'test') {
  app.use(morgan('combined'))
}

const hbs = expressHandlebars.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers
})

const store = new MongoStore({
  collection: 'sessions',
  uri: db.url
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'app/views')

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(csrf())
app.use(flash())
app.use(localsMiddleware)

app.use('/', homeRoute)
app.use('/courses', courseRoutes)
app.use('/cart', cartRoutes)
app.use('/auth', authRoutes)

module.exports = app
