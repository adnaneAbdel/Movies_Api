const express = require('express')

const Router = express.Router();

const auth = require('../controllors/auth')


Router.post('/login', auth.login)
Router.post('/register', auth.register)
Router.post('/me', auth.me)


module.exports = Router ;