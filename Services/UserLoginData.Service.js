const UserLoginData = async (req, res) => {
  res.send({ user: req.user })
}
module.exports = UserLoginData
