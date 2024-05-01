const express = require('express')

const Router = express.Router();

const MoiveWatched = require('../controllors/watchlistController')


Router.post('/', MoiveWatched.add)
Router.delete('/:movie', MoiveWatched.delete)
Router.get('/', MoiveWatched.list)



module.exports = Router ;