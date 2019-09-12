const mongoose = require('mongoose');

let developerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String
        }
    },
    level: {
        type: String,
        validate: {
            validator: function (levelString) {
                return levelString === "BEGINNER" || levelString === "EXPERT";
            },
            message: 'developer level must be either "Beginner" or  "Expert"'
        }
    },
    address: {
        State: {
            type: String
        },
        Suburb: {
            type: String
        },
        Street: {
            type: String
        },
        Unit: {
            type: String
        }
    }

});

module.exports = mongoose.model('Developer', developerSchema);