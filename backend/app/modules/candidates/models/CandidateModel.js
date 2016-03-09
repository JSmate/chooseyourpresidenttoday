'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Candidate Schema
 */
var CandidateSchema = new Schema({
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
    },
    image: {
        type: String,
        default: '',
        trim: true
    }
});

module.exports = mongoose.model('Candidate', CandidateSchema);