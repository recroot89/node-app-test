const uuid = require('uuid/v4')

class Course {
  constructor(title, price, image) {
    this.id = uuid()
    this.title = title
    this.price = price
    this.image = image
  }

  save() {

  }
}
