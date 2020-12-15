const { PORT } = require('../config/variables')
const app = require('./app')
const db = require('../config/database')

async function start() {
  try {
    await db.connect()
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
  } catch (err) {
    console.log(err)
  }
}

module.exports = start
