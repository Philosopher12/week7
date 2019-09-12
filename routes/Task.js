const mongoose = require('mongoose');

const Task = require('../models/Task');
const Developer = require('../models/Developer');

module.exports = {
    // add the functions over here
    createOne: function (req, res) {
        let newTaskDetails = req.body;
        console.log(newTaskDetails);
        var aTask = new Task({
            _id: new mongoose.Types.ObjectId(),
            name: newTaskDetails.name,
            due: newTaskDetails.due,
            assignedDev: newTaskDetails.assignedDev,
            status: 'InProgress',
            description: newTaskDetails.description
        });

        aTask.save(function (err) {
            if (err) return res.status(400).json(err);

            res.redirect('listtask');
            //console.log("i am here");
        });
    },
    deletetask: function (req, res) {
        let taskToDel = req.body;

        Task.deleteOne({ _id: taskToDel.taskId }, function (err, doc) {
            console.log('successfully deleted task');
            res.redirect('listtask');
        });
    },
    deletecomptask: function(req, res) {
        let taskToDel = req.body;

        Task.deleteMany({ 'status': 'Complete' }, function (err, doc) {
            console.log('successfully deleted completed tasks');
            res.redirect('listtask');
        });
    },
    updateStatus: function(req, res) {
        let taskToUpd = req.body;

        Task.updateOne({_id: taskToUpd.taskId}, {$set: {'status': taskToUpd.statusSl}}, function (err, doc) {
            console.log('successfully changed task status');
            res.redirect('listtask');
        });
    }
}