const userModel = require("../models/userModel");
const interviewModel = require("../models/interviewModel");

exports.getUserById = (req, res, next, id) => {
    userModel.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: `No user was found because ${error}`
            })
        }

        req.profile = user
        next();
    })
}

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req, res) => {
    userModel.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "you are not authorized to update information"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);
        }
    )
}


//TODO: change according to models
exports.userMeetingList = (req, res) => {
    interviewModel.find({ creater: req.profile })
        .exec((error, meetings) => {
            if (error) {
                return res.status(400).json({
                    error: "No meetings found"
                })
            }
            console.log(meetings);
            return res.json(meetings);
        })
}

exports.pushMeeting = (req, res, next) => {

    var start = convertDate(req.body.date + " " + req.body.startTime);
    var end = convertDate(req.body.date + " " + req.body.endTime);
    req.body.startTime = start;
    req.body.endTime = end;

    next();
}

function convertDate(str) {
    var dateTimeParts = str.split(' '),
        timeParts = dateTimeParts[1].split(':'),
        dateParts = dateTimeParts[0].split('-'),
        date;

    date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);

    return date.getTime();
}


