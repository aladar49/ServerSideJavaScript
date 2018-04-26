var Schema = require('mongoose').Schema;
var db = require('../config/db');


var reservation = db.model('reservation', {
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    name: String,
    vCPU: Number,
    RAM: Number,
    when: String,
    hours: Number
});

module.exports = reservation;