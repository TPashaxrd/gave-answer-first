const mongoose = require('mongoose')

const db = () => {
  mongoose.connect("mongodb+srv://toprak:1@cluster0.htwn0ni.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.error('MongoDB didnt connect:', err))
}

module.exports = db