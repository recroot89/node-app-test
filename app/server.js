const { PORT } = require('../config/variables')
const app = require('./app')
const db = require('../config/database')

function start() {
  try {
    db.connect()
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = start
