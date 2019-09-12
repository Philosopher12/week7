const mongoose = require('mongoose');

let taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    assignedDev: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer'
    },
    due: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        validate: {
            validator: function (statusValue) {
                return statusValue === 'InProgress' || statusValue ==='Complete';
            },
            message: 'Status should be either "InProgress" or "Complete"'
        }
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);