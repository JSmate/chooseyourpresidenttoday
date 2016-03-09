'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Person Schema
 */
var PersonSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    firstname: {
        type: String,
        default: '',
        trim: true
    },
    lastname: {
        type: String,
        default: '',
        trim: true
    }
});

module.exports = mongoose.model('Person', PersonSchema);