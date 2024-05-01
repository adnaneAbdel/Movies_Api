const mongoose = require('mongoose');

const MovieTable = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
       default: 0 
    },

    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
           
        },
        comment: {
            type: String,
            
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        }
      
    }]

},{
    timestamps: true
})
MovieTable.methods.stringifyId = function() {
    return this._id.toString();
};
const Model = mongoose.model('Movie', MovieTable);

module.exports = Model ; 