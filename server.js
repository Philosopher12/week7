
//week7 lab6
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const tasks = require('./routes/Task');
const developers = require('./routes/Developer');
const Task = require('./models/Task');
const Developer = require('./models/Developer');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('images'));
app.use(express.static('css'));
app.use(express.static('views'));
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/hogwartsDB', function(err) {
    if (err) {
        return console.log('Mongoose - connection error: ', err);
    }
    console.log('Successfully connected');
});

// loading views done here basically

app.get('/', function(req, res){
    // render the home page here.
    res.render('home.html', {
        // nothing actually happens here smh
    });
});

app.get('/newtask', function(req, res){
    // render the new tasks page here.
    res.render('newtask.html', {
   // res.sendFile(__dirname + '/views/newtask.html');
});
    });
//});

app.get('/newdeveloper', function(req, res) {
    //render the new dev page here
    res.render('newdeveloper.html', {
    });
});

app.get('/deletetask', function(req, res){
    // render the delete single task page here
    Task.find({}, function (err, data) {
    res.render('deletetask.html',{
        taskDb: data});
    })
});

app.get('/deletecomptask', function(req, res){
    // render that delete completed tasks page here
    Task.find({'status':'Complete'}, function (err, data) {
        res.render('deletecomptask.html',{
            taskDb: data});
    })
})

app.get('/taskStatus', function(req, res){
    // render the change task status page here
    Task.find({}, function (err, data) {
        res.render('taskstatus.html',{
            taskDb: data});
        })
    });

app.get('/listtask', function(req, res){
    // render the list tasks page here.
    Task.find({}, function (err, data) {
        res.render('listtask.html', {
            taskDb: data });
    })
});

app.get('/listdeveloper', function(req, res){
    // render the list devs page here.
    Developer.find({}, function (err, data) {
        res.render('listdeveloper.html', {
            devDb: data});
    })
});

// end of loading views


// calls to routes that use mongoose code starts here.
app.post('/addDev', function(req, res){
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
        aDev.save( function (err) {
            if (err) return res.status(400).json(err);

            res.redirect('listdeveloper');
        });
    
});

app.post('/addTask', function(req, res){
        let newTaskDetails = req.body;
        console.log(newTaskDetails);
        var aTask = new Task({
            _id: new mongoose.Types.ObjectId(),
            name: newTaskDetails.name,
            due: newTaskDetails.due,
            assignedDev: mongoose.Types.ObjectId(newTaskDetails.assignedDev),
            status: newTaskDetails.status,
            description: newTaskDetails.description
        });

        aTask.save(function (err) {
            if (err) return res.status(400).json(err);
            console.log('error here', err);
            res.redirect('listtask');
            //console.log("i am here");
        });
    });
app.post('/remTask', function(req, res){
        let taskToDel = req.body;
    
        Task.deleteOne({ _id: taskToDel.taskId }, function (err, doc) {
            console.log('successfully deleted task');
            res.redirect('listtask');
        });
    });

app.post('/remCompleted', function(req, res){
        let taskToDel = req.body;
    
        Task.deleteMany({ 'status': 'Complete' }, function (err, doc) {
            console.log('successfully deleted completed tasks');
            res.redirect('listtask');
        });
    });
app.post('/modStatus', function(req, res){ 
    let taskToUpd = req.body;

    Task.updateOne({_id: taskToUpd.taskId}, {$set: {'status': taskToUpd.statusSl}}, function (err, doc) {
        console.log('successfully changed task status');
        res.redirect('listtask');
    });
});

app.listen(8080);
console.log("listening on port 8080");





