const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Course App',
    isHome: true
  })
})

module.exports = router
