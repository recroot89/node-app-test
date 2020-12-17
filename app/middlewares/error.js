const path = require('path')

exports.notFound = function notFound(req, res, next) {
  res.status(404).sendFile(path.join(__dirname, '../../public/404.html'))
}

exports.handleError = function handleError(err, req, res, next) {
  res.status(500).sendFile(path.join(__dirname, '../../public/500.html'))
}
