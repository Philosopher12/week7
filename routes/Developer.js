var Task = require('../models/Task');
var Developer = require('../models/Developer');

const mongoose = require('mongoose');
module.exports = {

    createOne: function (req, res) {
        let newDevDetails = req.body;
        console.log(newDevDetails);
        var aDev = new Developer({
            _id: new mongoose.Types.ObjectId(),
            name: {
                firstName: newDevDetails.firstName,
                lastName: newDevDetails.lastName
            },
            level: newDevDetails.level,
            address: {
                State: newDevDetails.State,
                Suburb: newDevDetails.Suburb,
                Street: newDevDetails.Street,
                Unit: newDevDetails.Unit
            }
        });
        Developer.create(aDev, function (err, developer) {
            if (err) return res.status(400).json(err);

            res.redirect('listdeveloper');
        });
    }
};