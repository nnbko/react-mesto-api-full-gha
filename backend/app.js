require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const { validateLogin, validateCreateUser } = require('./utils/validation');
const ErrorNotFound = require('./constants/ErorrNotFound');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { NODE_ENV, PORT, DB_ADDRESS } = process.env;

const { login, createUser } = require('./controllers/users');

const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://127.0.0.1/mestodb');
app.use(requestLogger);
app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new ErrorNotFound('Тут ничего нет'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(3001);
