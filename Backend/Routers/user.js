const express=require('express');
const router=express.Router();

const {getUserById, getUser, updateUser, userMeetingList, pushMeeting}=require("../controllers/user");
const {isSignedIn,isAdmin,isAuthenticated}=require("../controllers/auth");

router.param("userId",getUserById);

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);
router.get("/meetings/user/:userId",isSignedIn,isAuthenticated,userMeetingList);

module.exports=router;