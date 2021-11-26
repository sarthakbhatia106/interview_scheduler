import React, { useState, useEffect } from 'react';
import "../styles.css";
import { API } from '../backend';
import Base from './Base';
import { getMeetings } from './helper/getMeetingsHelper';
import { isAutheticated } from '../auth/helper';
import Card from "./Card";


export default function Home() {

    const [meetings, setMeetings] = useState([])
    const [error, setError] = useState(false)

    const { user,token } = isAutheticated();

    const loadAllMeetings = () => {
        if(!user){
            return;
        }
        getMeetings(user._id,token).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setMeetings(data);
            }
        })
    }
    console.log(meetings);

    useEffect(() => {
        loadAllMeetings()
    }, [])

    return (
        <Base title="Home page">
            {
                (user && meetings && !error) ?
                <div className="row text-center">
                    <h1 className="text-white">All meetings</h1>
                    <div className="row">
                        {meetings.map((meeting, index) => {
                            return (
                                <div key={index} className="col-4 mb-4">
                                    <Card meeting={meeting} token={token} />
                                </div>
                            )
                        })}
                    </div>
                </div>:
                <h1>Welcome to the Interview Scheduler</h1>
            }
        </Base>
    )
}
