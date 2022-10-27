const bcrypt = require('bcrypt')
const { generateJWT } = require('../Helper')
const UserModel = require('../Models/UserModel')
const UserLogin = async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body
  try {
    if (email && password) {
      const user = await UserModel.findOne({ email: email })
      if (user != null) {
        const isMatchPassword = await bcrypt.compare(password, user.password)
        const isMatchEmail = user.email === email
        if (isMatchEmail && isMatchPassword) {
          const savedUser = await UserModel.findOne({ email: email })
          const token = await generateJWT(savedUser)
          res
            .status(200)
            .send({ status: 'success', message: 'Login successfull', token })
        } else {
          res
            .status(404)
            .send({ status: 'failed', message: 'Wrong credientials' })
        }
      } else {
        res
          .status(403)
          .send({ status: 'failed', message: 'Email is not Registered' })
      }
    } else {
      res
        .status(400)
        .send({ status: 'failed', message: 'All fields are Required' })
    }
  } catch (error) {
    console.log('User Controller login -- ', error)
    res.status(500).send({ status: 'failed', message: 'Network Problem' })
  }
}
module.exports = UserLogin
