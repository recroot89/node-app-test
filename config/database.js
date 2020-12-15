const mongoose = require('mongoose')
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = require('./variables')

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

function connect() {
  mongoose.connect(url, options)
    .catch(err => console.log(err))
  console.log('MongoDB connected')
}

function disconnect() {
  mongoose.disconnect()
  console.log('MongoDB disconnected')
}

async function clearAllCollections() {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    await collection.deleteMany()
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections)
  console.log(collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    try {
      await collection.drop()
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = { connect, disconnect, clearAllCollections, dropAllCollections, url }
