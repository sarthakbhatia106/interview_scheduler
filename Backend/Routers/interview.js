const express=require("express");
const { getMeetingById, createMeeting, getMeeting, deleteMeeting, updateMeeting } = require("../controllers/interview");
const { getUserById, pushMeeting } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin }=require("../controllers/auth");
const router=express.Router();

router.param("userId",getUserById);
router.param("meetingId",getMeetingById);

router.post("/meeting/create/:userId",isSignedIn,isAuthenticated,isAdmin,pushMeeting,createMeeting);

router.get("/meeting/:meetingId",getMeeting);

router.delete("/meeting/:meetingId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteMeeting);

router.put("/meeting/:meetingId/:userId",isSignedIn,isAuthenticated,isAdmin,updateMeeting);

module.exports=router;