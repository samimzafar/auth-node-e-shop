const UserModel = require('../Models/UserModel')
const UserRegistrationService = require('../Services/UserRegistration.Service')
const UserLoginService = require('../Services/UserLogin.Service')
const ChangeUserPasswordService = require('../Services/ChangeUserPassword.Service')
const UserLoginDataService = require('../Services/UserLoginData.Service')
const UserRegistration = async (req, res) => {
  try {
    await UserRegistrationService(req, res)
  } catch (error) {
    console.log('User Controller Registration error - ', error)
    res.status(500).send({ status: 'failed', message: 'Network failed' })
  }
}

const UserLogin = async (req, res) => {
  try {
    await UserLoginService(req, res)
  } catch (error) {
    console.log('User Controller Login error - ', error)
    res.status(500).send({ status: 'failed', message: 'Network failed' })
  }
}
const ChangeUserPassword = async (req, res) => {
  try {
    await ChangeUserPasswordService(req, res)
  } catch (error) {
    console.log('User Controller Login error - ', error)
    res.status(500).send({ status: 'failed', message: 'Network failed' })
  }
}
const UserLoginData = async (req, res) => {
  try {
    await UserLoginDataService(req, res)
  } catch (error) {
    console.log('User Controller Login Data error - ', error)
    res.status(500).send({ status: 'failed', message: 'Network failed' })
  }
}

module.exports = {
  UserRegistration,
  UserLogin,
  ChangeUserPassword,
  UserLoginData
}
