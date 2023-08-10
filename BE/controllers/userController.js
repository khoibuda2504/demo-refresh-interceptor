const userController = (req, res) => {
  res.json({docs: [
    {id: '1', username: '1'},
    {id: '2', username: '2'},
    {id: '3', username: '3'},
  ]})
}

module.exports = userController