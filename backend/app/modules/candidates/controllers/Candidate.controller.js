'use strict';

var Candidate = require('../models/CandidateModel');

module.exports = {
    query: function (req, res) {
        Candidate.find(function (err, people) {
           res.json(people);
        });
    },
    create: function (req, res) {
        console.log(req.body);
        var Candidate = new Candidate(req.body);

        Candidate.save(function(err) {
            if (err) {

            } else {
                res.json(Candidate);
            }
        });
    }
};