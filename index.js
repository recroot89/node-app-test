const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const homeRoute = require('./routes/home')
const courseRoutes = require('./routes/course')
const cartRoutes = require('./routes/cart')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use('/', homeRoute)
app.use('/course', courseRoutes)
app.use('/cart', cartRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
