import React, { useState } from "react";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createMeeting } from "./helper/adminapicall";

const AddMeeting = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();

  const handleChangeStartTime = event => {
    setError("");
    setStartTime(event.target.value);
  };

  const handleChangeEndTime = event => {
    setError("");
    setEndTime(event.target.value);
  };

  const handleChangeParticipants = event => {
    setError("");
    setParticipants(event.target.value);
  };

  const handleChangeDate = event => {
    setError("");
    setDate(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    createMeeting(user._id, token, { date,startTime,endTime,participants }).then(data => {
      if (data.error) {
        console.log(data.error);
        setError("error");
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        setError("");
        setSuccess(true);
        setStartTime("");
        setEndTime("");
        setParticipants("");
        setDate("");
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Meeting created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error!="") {
      // console.log(error);
      return <h4 className="text-danger">{error}</h4>;
    }
  };

  const meetingForm = () => (
    <form>
      <div className="form-group w-75">
      <p className="lead">Enter the Date</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChangeDate}
          value={date}
          autoFocus
          required
          placeholder="Please enter date as dd-mm-yyyy"
        />
        <p className="lead">Enter the Start Time</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChangeStartTime}
          value={startTime}
          autoFocus
          required
          placeholder="Please enter time in 24 hr format (24:00)"
        />
        <p className="lead">Enter the End Time</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChangeEndTime}
          value={endTime}
          autoFocus
          required
          placeholder="Please enter time in 24 hr format (24:00)"
        />
        <p className="lead">Enter the participants</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChangeParticipants}
          value={participants}
          autoFocus
          required
          placeholder="Enter participants' email separated by spaces"
        />
        <button onClick={onSubmit} className="btn btn-outline-success rounded">
          Create Meeting
        </button>
      </div>
    </form>
  );

  return (
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {meetingForm()}
        </div>
  );
};

export default AddMeeting;
