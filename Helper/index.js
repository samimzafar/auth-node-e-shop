require('dotenv').config()
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const passwordHashed = async password => {
  const salt = await bcrypt.genSalt(12)
  const hashPassword = bcrypt.hash(password, salt)
  return hashPassword
}

const generateJWT = async user => {
  const SECRET_KEY = process.env.SECRET_KEY
  const token = await JWT.sign(
    { userID: user._id, userName: user.name },
    SECRET_KEY,
    {
      expiresIn: '1d'
    }
  )
  return token
}
module.exports = {
  passwordHashed,
  generateJWT
}
