const dotenv = require('dotenv')
const path = require('path')

const { NODE_ENV } = process.env

if (NODE_ENV !== 'production') {
  const testPath = path.join(__dirname, '../test/test.env')
  const result = NODE_ENV === 'development'
    ? dotenv.config()
    : dotenv.config({ path: testPath })

  if (result.error) {
    throw result.error
  }

  const { parsed: envs } = result
  module.exports = envs
}
