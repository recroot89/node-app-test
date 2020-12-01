const { Router } = require('express')
const Course = require('../models/course')

const router = Router()

router.get('/', (req, res) => {
  res.render('course/index', {
    title: 'Courses',
    isCourses: true
  })
})

router.get('/new', (req, res) => {
  res.render('course/new', {
    title: 'Add new course',
    isNewCourse: true
  })
})

router.get('/:id', (req, res) => {
  res.render('course/show', {
    title: `Course ${req.params.title}`,
    isCourse: true
  })
})

router.post('/', (req, res) => {
  const { title, price, image } = req.body
  const course = new Course(title, price, image)
  course.save()

  res.redirect('/')
})

module.exports = router
