'use strict';

var Person = require('../models/PersonModel');

module.exports = {
    query: function (req, res) {
        Person.find(function (err, people) {
           res.json(people);
        });
    },
    create: function (req, res) {
        console.log(req.body);
        var person = new Person(req.body);

        person.save(function(err) {
            if (err) {

            } else {
                res.json(person);
            }
        });
    }
};