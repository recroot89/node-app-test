require('dotenv').config()
const db = require('./config/database')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const morgan = require('morgan')
const path = require('path')

const homeRoute = require('./routes/home')
const authRoutes = require('./routes/auth')
const courseRoutes = require('./routes/course')
const cartRoutes = require('./routes/cart')

const app = express()

app.use(morgan('combined'))

const hbs = expressHandlebars.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoute)
app.use('/courses', courseRoutes)
app.use('/cart', cartRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000

function start() {
  try {
    db.start()
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = start
