const interviewModel = require("../models/interviewModel");
const userModel = require("../models/userModel");

exports.getMeetingById = (req, res, next, id) => {
    interviewModel.findById(id)
        .exec((err, meeting) => {
            if (err) {
                return res.status(400).json({
                    error: "meeting not found"
                })
            }
            req.meeting = meeting;
            next();
        });
};

exports.createMeeting = (req, res) => {
    req.body.creater = req.profile
    let e = "";

    let start = req.body.startTime;
    let end = req.body.endTime;
    let participants = req.body.participants.split(" ");


    //checking if meeting can be scheduled
    for (let i = 0; i < participants.length; i++) {

        userModel.findOne({ "email": participants[i] }).exec()
            .then((user) => {
                let meetings = user.meetings;
                for (let i = 0; i < meetings.length; i++) {
                    let s = parseInt(start, 10);
                    let e = parseInt(end, 10);
                    let ms = parseInt(meetings[i].startTime, 10);
                    let me = parseInt(meetings[i].endTime, 10);
                    if ((s < ms && e < ms) || (s > me && e > me)) {
                        continue;
                    } else {
                        e = "Time clashing with participants";
                        break;
                    }
                }
            }).catch((err) => {
                e = "participant not found";
            })
    }

    if (participants.length <= 1) {
        e= "Less Than 2 participants not allowed";
    }

    //saving meeting to database
    const meeting = new interviewModel(req.body);
    meeting.save((error, meeting) => {
        if (error || e != "") {
            return res.status(400).json({
                error: e == "" ? error : e
            })
        }
        //saving meeting to participant's database
        addMeetingToParticipants(participants, meeting);

        //adding meeting to creater's database
        let obj = {
            id: meeting._id,
            startTime: meeting.startTime,
            endTime: meeting.endTime
        }
        userModel.findOneAndUpdate(
            { _id: req.profile._id },
            { $push: { meetings: obj } },
            { new: true },
            (err, meetings) => {
                if (err) {
                    return res.status(400).json({
                        error: "Unable to save meeting list"
                    })
                }
            }
        )
        return res.json(meeting);
    });
}

function addMeetingToParticipants(participants, meeting) {
    let obj = {
        id: meeting._id,
        startTime: meeting.startTime,
        endTime: meeting.endTime,
    }

    for (let i = 0; i < participants.length; i++) {
        addMeeting(participants[i], obj);
    }
}

function addMeeting(email, meeting) {

    userModel.findOneAndUpdate(
        { "email": email },
        { $push: { meetings: meeting } },
        { new: true },
        (err, meetings) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to save meeting list"
                })
            }
        }
    )
}

exports.getMeeting = (req, res) => {
    return res.json(req.meeting);
}

//delete controller
exports.deleteMeeting = (req, res) => {
    //deleting meeting from interview schema
    let meeting = req.meeting
    meeting.remove((err, deletedMeeting) => {
        if (err) {
            return res.status(400).json({
                error: "failed to delete the meeting"
            })
        }

        //deleting meeting from user schema
        userModel.updateMany({}, {
            $pull: { meetings: { id: meeting._id } },
        }).exec().then(() => {
            res.json({
                message: "deletion was a success",
                deletedMeeting
            });
        })
    });
}
//update controller
exports.updateMeeting = (req, res) => {

    //updating meeting
    interviewModel.findByIdAndUpdate(
        { _id: req.meeting._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, meeting) => {
            if (err || !meeting) {
                return res.status(400).json({
                    error: "you are not authorized to update information" + err
                })
            }

            res.json(meeting);
        }
    )
}
