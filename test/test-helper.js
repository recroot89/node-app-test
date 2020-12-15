const db = require('../config/database')

module.exports = {
  setupDB() {
    beforeAll(async () => {
      await db.connect()
    })

    afterEach(async () => {
      await db.clearAllCollections()
    })

    afterAll(async () => {
      await db.dropAllCollections()
      await db.disconnect()
    })
  }
}
