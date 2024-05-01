const express = require('express');
const app = express();
const port = 3000 ;
//import mongoose 
const mongoose = require('mongoose')
//import body parser for confugire requiest
const BodyParser = require('body-parser')




//use body-parser:
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }));
//use dotnev
require('dotenv').config();
app.get('/', (req, res) => {
    res.send('hello from new test api movie...')
})
//importing routers 
app.use('/api/auth', require('./router/router'))
app.use('/api/movie', require('./router/routerMovie'))
app.use('/api/watch', require('./router/watchlist'))


mongoose.connect('mongodb://127.0.0.1:27017/MovieAPI');
app.listen(port , () => console.log(`the sever run to ${port}`))

