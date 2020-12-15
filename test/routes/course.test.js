const app = require('../../app/app')
const supertest = require('supertest')
const { setupDB } = require('../test-helper')
const Course = require('../../app/models/course')
const User = require('../../app/models/user')

const request = supertest(app)

const body = {
  title: 'Test',
  description: 'Test',
  price: 10000,
  image: 'https://test'
}

setupDB()
describe('courses page tests', () => {
  it('should get courses page', async (done) => {
    const res = await request.get('/courses')
    expect(res.status).toBe(200)
    const courses = await Course.find().count()
    expect(courses).toBe(0)
    done()
  })

  it('should not create course', async (done) => {
    const res = await request.post('/courses').send(body)
    expect(res.status).toBe(403)
    const courses = await Course.find().count()
    expect(courses).toBe(0)
    done()
  })

  // it('should create course after login', async (done) => {
  //     const resp = await request.post('/auth/register').send({
  //     email: 'teset@test.test',
  //     name: 'test',
  //     password: 'password123',
  //     confirm: 'password123'
  //   })
  //   console.log(resp)
  //   await request.post('/auth/login').send({
  //     email: 'teset@test.test',
  //     password: 'password123'
  //   })

  //   const users = await User.find().count()
  //   expect(users).toBe(1)
  //   const res = await request.post('/courses').send(body)
  //   expect(res.status).toBe(200)

  //   const course = await Course.findOne({ title: 'Test' })
  //   expect(course.title).toBe('Test')
  //   expect(course.description).toBe('Test')
  //   expect(course.price).toBe(10000)
  //   expect(course.image).toBe('https://test')

  //   done()
  // })
})
