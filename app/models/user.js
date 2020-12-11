const { Schema, model } = require('mongoose')

const user = new Schema({
  email: {
    type: String,
    required: true
  },
  name: String,
  password: {
    type: String,
    required: true
  },
  cart: {
    items: [{
      count: {
        type: Number,
        required: true,
        default: 1
      },
      courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
      }
    }]
  }
}, { timestamps: true })

user.virtual('id').get(function() {
  return this._id.toHexString()
})

user.methods.addToCart = function(course) {

}

user.methods.removeFromCart = function(course) {
  const items = [...this.cart.items]
}

module.exports = model('User', user)
