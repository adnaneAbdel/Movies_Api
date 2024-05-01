const mongoose = require('mongoose');

const UserTable = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        maxlength: 20,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    whichList:[
        {
                movie:{
                    type: mongoose.Schema.Types.ObjectId ,
                    ref: 'Moive'
                },
                watched: Boolean ,
        }
    ],

    isAdmin: {
        type: Boolean,
        default: false
    }

},{
    timestamps: true
})
UserTable.methods.stringifyId = function() {
    return this._id.toString();
};

const Model = mongoose.model('User', UserTable);

module.exports = Model ; 