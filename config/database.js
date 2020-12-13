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
}

function disconnect() {
  mongoose.disconnect(url, options)
    .catch(err => console.log(err))
}

module.exports = { connect, disconnect, url }
