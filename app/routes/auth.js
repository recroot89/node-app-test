const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const { registerValidator } = require('../validators/register')
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

router.post('/register', registerValidator, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      req.flash('registerError', errors.array()[0].msg)
      return res.status(422).redirect('/auth/login#register')
    }

    const { email, password, name } = req.body
    const passwordDigest = await bcrypt.hash(password, 12)
    const user = new User({
      email, password: passwordDigest, name, cart: { items: [] }
    })
    await user.save()
    res.redirect('/auth/login#login')
  } catch (err) {
    console.log(err)
    req.flash('registerError', 'Something went wrong.')
    res.status(501).redirect('/auth/login#register')
  }
})

module.exports = router
