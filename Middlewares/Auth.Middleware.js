require('dotenv').config()
const JWT = require('jsonwebtoken')
const UserModel = require('../Models/UserModel')

const checkUserAuth = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  //   console.log('authorization - ', authorization)
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1]
      const { userID } = JWT.verify(token, process.env.SECRET_KEY)
      req.user = await UserModel.findById(userID).select('-password')

      next()
    } catch (error) {
      console.log('Midlle auth error - ', error)
      res.status(401).send({ status: 'failed', message: 'UnAuthorized User' })
    }
  }
  if (!token) {
    res
      .status(401)
      .send({ status: 'failed', message: 'UnAuthorized User,No Token found' })
  }
}

module.exports = checkUserAuth
