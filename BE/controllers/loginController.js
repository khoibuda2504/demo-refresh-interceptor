const jwt = require('jsonwebtoken')
const loginController = (req, res) => {
  if (req.body.username !== '1') return res.sendStatus(401)
  const accessToken = jwt.sign({ username: '1' }, process.env.ACCESS_TOKEN,{ expiresIn: '3s' });
  const refreshToken = jwt.sign({ username: '1' }, process.env.REFRESH_TOKEN,{ expiresIn: '1d' });
  // res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false,sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
  res.json({ accessToken, user: "Khoi" });
}

module.exports = loginController