const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config()
const app = express();

app.use(cookieParser());
app.use(cors({
  origin: 'http://127.0.0.1:5173',
  credentials: true
}))
app.use(express.json());

app.get('/refresh', require('./controllers/refreshController'))
app.post('/login', require('./controllers/loginController'))
app.post('/logout', require('./controllers/logoutController'))

app.use(require('./middlewares/verifyJWT'))
app.get('/users', require('./controllers/userController'))

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});