const mongoose = require('mongoose')

const MONGO_USERNAME = 'app'
const MONGO_PASSWORD = 'password'
const MONGO_HOSTNAME = '127.0.0.1'
const MONGO_PORT = '27017'
const MONGO_DB = 'nodeapp'

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

function start() {
  mongoose.connect(url, options)
    .catch(err => console.log(err))
}

module.exports = { start }
