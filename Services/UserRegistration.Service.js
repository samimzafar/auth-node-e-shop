const UserModel = require('../Models/UserModel')
const { passwordHashed, generateJWT } = require('../Helper')
const UserRegistration = async (req, res) => {
  const { name, email, password, password_confirmation, tc } = req.body
  const user = await UserModel.findOne({ email: email })
  if (user) {
    res.status(401).send({ status: 'failed', message: 'Email Already exists' })
  } else {
    if (name && email && password && password_confirmation && tc) {
      if (password === password_confirmation) {
        try {
          const hashPassword = await passwordHashed(password)
          const doc = new UserModel({
            name,
            email,
            password: hashPassword,
            tc
          })
          await doc.save()
          const savedUser = await UserModel.findOne({ email: email })
          const token = await generateJWT(savedUser)
          res.status(201).send({
            status: 'success',
            message: 'User Registered',
            token
          })
        } catch (error) {
          console.log('userRegistration failed - ', error)
          res.status(400).send({
            status: 'failed',
            message: 'Registration failed'
          })
        }
      } else {
        res.status(400).send({
          status: 'failed',
          message: 'Password and Confirm Password not matched'
        })
      }
    } else {
      res
        .status(400)
        .send({ status: 'failed', message: 'All fields are Required' })
    }
  }
}

module.exports = UserRegistration
