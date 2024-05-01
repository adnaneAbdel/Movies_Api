const express = require('express')

const Router = express.Router();

const Moive = require('../controllors/controllorsMoive')


Router.post('/create', Moive.create)
Router.delete('/:id', Moive.delete)
Router.put('/:id', Moive.update)
Router.get('/list', Moive.list)
Router.get('/:id', Moive.find)
Router.post('/:id/reviews', Moive.reviews)
Router.get('/:id/reviews', Moive.addReviews)



module.exports = Router ;