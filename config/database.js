const mongoose = require('mongoose')

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

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

module.exports = { start, url }
