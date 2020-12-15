const app = require('../../app/app')
const supertest = require('supertest')

const request = supertest(app)

describe('home page tests', () => {
  it('should get home page', async (done) => {
    const res = await request.get('/')
    expect(res.status).toBe(200)
    done()
  })
})
