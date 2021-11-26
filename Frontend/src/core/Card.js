import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { deleteMeeting } from './helper/getMeetingsHelper';
// import { addItemToCart, removeItemFromCart } from './helper/CartHelper';

const convertTime=(num)=>{
    var date=new Date(num);
    var d=date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
    var hr=date.getHours();
    var min=date.getMinutes();
    return {
        date: d,
        hour:hr,
        minute:min
    }
}

const Card = ({
    meeting,
    token
}) => {

    const [error,setError]=useState("");

    const tempStart=convertTime(meeting.startTime);
    const tempEnd=convertTime(meeting.endTime);

    const start= tempStart.hour+":"+tempStart.minute;
    const end=tempEnd.hour+":"+tempEnd.minute;
    const date=tempStart.date;
    // console.log(meeting);

    const deleteMeetingFront=()=>{
        deleteMeeting(meeting.creater,token,meeting._id).then(data=>{
            if(data.error){
                setError(data.error);
            }else{
                window.location.reload();    
            }
        })
    }
    

    return (
        <div className="card" style={{width:"50%"}}>
            <div className="card-body bg-dark">
                <h5 className="card-title">Meeting Details</h5>
                <h6 className="card-subtitle mb-2 text-muted">Date:{date}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Start Time:{start}</h6>
                <h6 className="card-subtitle mb-2 text-muted">End Time:{end}</h6>

                <button className="btn btn-secondary rounded m-3">Update Meeting</button>
                <button className="btn btn-danger rounded m-3" onClick={deleteMeetingFront}>Delete Meeting</button>

            </div>
        </div>
    );
};

export default Card;