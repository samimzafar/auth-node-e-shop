const express = require('express')
const router = express.Router()

const UserController = require('../Controllers/UserController')
const UserAuthMiddleware = require('../Middlewares/Auth.Middleware')

router.use('/changepassword', UserAuthMiddleware)
router.use('/loggesuser', UserAuthMiddleware)
router.post('/register', UserController.UserRegistration)
router.post('/login', UserController.UserLogin)
router.post('/changepassword', UserController.ChangeUserPassword)
router.use('/loggesuser', UserController.UserLoginData)
module.exports = router
