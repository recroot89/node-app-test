const { Router } = require('express')
const Course = require('../models/course')

const router = Router()

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find()
    res.render('courses/index', {
      title: 'Courses',
      isCourses: true,
      courses
    })
  } catch (err) {
    console.log(err)
  }
})

router.get('/new', (req, res) => {
  res.render('courses/new', {
    title: 'Add new course',
    isNewCourse: true
  })
})

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)

    res.render('courses/show', {
      title: `Course ${course.title}`,
      layout: 'blank',
      course
    })
  } catch (err) {
    console.log(err)
    res.redirect('/courses')
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)

    res.render('courses/edit', {
      title: `Edit course ${course.title}`,
      course
    })
  } catch (err) {
    console.log(err)
    res.redirect('/courses')
  }
})

router.post('/', async (req, res) => {
  const { title, price, image, description } = req.body
  const course = new Course({ title, price, image, description })

  try {
    await course.save()
  } catch (err) {
    console.log(err)
  }
  res.redirect('/courses')
})

router.post('/:id', async (req, res) => {
  try {
    const { id, title, price, image, description } = req.body
    await Course.findByIdAndUpdate(id, { title, price, image, description })
  } catch (err) {
    console.log(err)
  }
  res.redirect('/courses')
})

router.post('/:id/remove', async (req, res) => {
  const { _id } = req.body
  try {
    await Course.deleteOne({ _id })
  } catch (err) {
    console.log(err)
  }
  res.redirect('/courses')
})

module.exports = router
