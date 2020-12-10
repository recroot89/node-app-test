const { Router } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const router = Router()

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    isLogin: true,
    loginError: req.flash('loginError'),
    registerError: req.flash('registerError')
  })
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      const passwordIsValid = await bcrypt.compare(password, user.password)
      if (passwordIsValid) {
        req.session.user = user
        req.session.isAuthenticated = true
        req.session.save((err) => {
          if (err) {
            throw err
          }
          res.redirect('/')
        })
      } else {
        req.flash('loginError', 'Wrong password')
        res.redirect('/auth/login#login')
      }
    } else {
      req.flash('loginError', 'The user with this email does not exist.')
      res.redirect('/auth/login#login')
    }
  } catch (err) {
    console.log(err)
  }
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
      req.flash('registerError', 'The user with this email already exists.')
      res.redirect('/auth/login#register')
    } else {
      const passwordDigest = await bcrypt.hash(password, 12)
      const user = new User({
        email, password: passwordDigest, name, cart: { items: [] }
      })
      await user.save()
      res.redirect('/auth/login#login')
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
