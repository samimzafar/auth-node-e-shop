const mongoose = require('mongoose')

const connectDB = async URL => {
  try {
    let dbOptions = { dbName: 'E-Shop' }
    await mongoose.connect(URL, dbOptions)
    console.log('DB Conn Succesfull ')
  } catch (error) {
    console.log('DB Conn Error - ', error)
  }
}

module.exports = connectDB
