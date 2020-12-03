const { Router } = require('express')
const Course = require('../models/course')

const router = Router()

router.get('/', async (req, res) => {
  const courses = await Course.find().lean()

  res.render('course/index', {
    title: 'Courses',
    isCourses: true,
    courses
  })
})

router.get('/new', (req, res) => {
  res.render('course/new', {
    title: 'Add new course',
    isNewCourse: true
  })
})

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id).lean()

  res.render('course/show', {
    title: `Course ${course.title}`,
    layout: 'blank',
    course
  })
})

router.get('/:id/edit', async (req, res) => {
  const course = await Course.findById(req.params.id).lean()

  res.render('course/edit', {
    title: `Edit course ${course.title}`,
    course
  })
})

router.post('/', async (req, res) => {
  const { title, price, image } = req.body
  const course = new Course({ title, price, image })

  try {
    await course.save()
    res.redirect('/course')
  } catch (err) {
    console.log(err)
  }

})

router.post('/edit', async (req, res) => {
  const { _id, title, price, image } = req.body
  await Course.findByIdAndUpdate(_id, { title, price, image })
  res.redirect('/course')
})

router.post('/remove', async (req, res) => {
  const { _id } = req.body
  try {
    await Course.deleteOne({ _id })
    res.redirect('/course')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
