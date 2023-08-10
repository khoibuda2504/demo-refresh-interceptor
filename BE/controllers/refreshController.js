const jwt = require('jsonwebtoken')

const refreshController = (req, res) => {
  const cookies = req.cookies
  if (!cookies.refreshToken) return res.sendStatus(401)
  jwt.verify(cookies.refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    const accessToken = jwt.sign(
      {
        "username": decoded.username,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: '3s' }
    );
    return res.json({ accessToken });
  })
}

module.exports = refreshController