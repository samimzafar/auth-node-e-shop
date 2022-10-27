const bcrypt = require('bcrypt')
const { generateJWT, passwordHashed } = require('../Helper')
const UserModel = require('../Models/UserModel')
const ChangeUserPassword = async (req, res) => {
  console.log(req.body)
  const { password, password_confirmation } = req.body
  if (password && password_confirmation) {
    if (password === password_confirmation) {
      const hashPassword = await passwordHashed(password)
      console.log(req.user._id)
      await UserModel.findByIdAndUpdate(req.user._id, {
        $set: { password: hashPassword }
      })
      res.status(200).send({
        status: 'success',
        message: 'Password Changed'
      })
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

  try {
  } catch (error) {
    console.log('User Controller Change Password -- ', error)
    res.status(500).send({ status: 'failed', message: 'Network Problem' })
  }
}
module.exports = ChangeUserPassword
