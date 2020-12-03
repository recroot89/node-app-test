const { Router } = require('express')
const Course = require('../models/course')

const router = Router()

router.get('/', async (req, res) => {
  const courses = await Course.find().lean()

  res.render('courses/index', {
    title: 'Courses',
    isCourses: true,
    courses
  })
})

router.get('/new', (req, res) => {
  res.render('courses/new', {
    title: 'Add new course',
    isNewCourse: true
  })
})

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id).lean()

  res.render('courses/show', {
    title: `Course ${course.title}`,
    layout: 'blank',
    course
  })
})

router.get('/:id/edit', async (req, res) => {
  const course = await Course.findById(req.params.id).lean()

  res.render('courses/edit', {
    title: `Edit course ${course.title}`,
    course
  })
})

router.post('/', async (req, res) => {
  const { title, price, image } = req.body
  const course = new Course({ title, price, image })

  try {
    await course.save()
    res.redirect('/courses')
  } catch (err) {
    console.log(err)
  }

})

router.post('/:id', async (req, res) => {
  const { _id, title, price, image } = req.body
  await Course.findByIdAndUpdate(_id, { title, price, image })
  res.redirect('/courses')
})

router.post('/:id/remove', async (req, res) => {
  const { _id } = req.body
  try {
    await Course.deleteOne({ _id })
    res.redirect('/courses')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
