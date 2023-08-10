const logoutController = (req, res) => {
  res.clearCookie('refreshToken');
  res.sendStatus(200);
}

module.exports = logoutController