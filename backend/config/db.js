const mongoose = require('mongoose')

const db = () => {
  mongoose.connect("", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.error('MongoDB didnt connect:', err))
}

module.exports = db