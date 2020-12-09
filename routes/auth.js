const { Router } = require('express')
const User = require('../models/user')

const router = Router()

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    isLogin: true
  })
})

router.post('/login', async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  req.session.user = user
  req.session.isAuthenticated = true
  req.session.save((err) => {
    if (err) {
      throw err
    }
    res.redirect('/')
  })
})

router.get('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

router.post('/register', async (req, res) => {
  try {
    const { email, password, repeat, name } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.redirect('/auth/login#register')
    } else {
      const user = new User({
        email, password, name, cart: { items: [] }
      })
      await user.save()
      res.redirect('/auth/login#login')
    }
  } catch (err) {
    console.log(err)
  }
})
module.exports = router
