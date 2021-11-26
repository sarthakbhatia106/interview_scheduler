import React, { useState } from "react";
import Base from "../core/Base";
import { isAutheticated, updateUserResume } from "../auth/helper";
import { Link } from "react-router-dom";


const UserDashBoard = () => {

    const [resume, setResume] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);


    const { user,token } = isAutheticated();
    const {name,email,role}=user;

    const adminLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">User Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2 text-black">Name:</span> {name}
                    </li>

                    <li className="list-group-item">
                        <span className="badge badge-success mr-2 text-black">Email:</span> {email}
                    </li>
                </ul>
            </div>
        )
    }
    const handleChangeResume = event => {
        setError("");
        setResume(event.target.value);
    };

    const onSubmit = event => {
        event.preventDefault();
        setError("");

        updateUserResume(user._id, token).then(data => {
            if (data.error) {
              setError("error");
              setTimeout(() => {
                setError("");
              }, 2000);
            } else {
              setError("");
              setSuccess(true);
              setResume("");
              setTimeout(() => {
                setSuccess(false);
              }, 2000);
            }
          });
        
    };

    const successMessage = () => {
        if (success) {
          return <h4 className="text-success">Resume updated successfully</h4>;
        }
      };
    
      const warningMessage = () => {
        if (error!="") {
          console.log(error);
          return <h4 className="text-danger">{error}</h4>;
        }
      };

    const resumeForm = () => (
        <form>
            <div className="form-group w-75 m-4">
                <p className="lead">Enter the link to resume</p>
                <input
                    type="text"
                    className="form-control my-3"
                    onChange={handleChangeResume}
                    value={resume}
                    autoFocus
                    required
                    placeholder="Please enter the drive link of resume"
                />
                <button onClick={onSubmit} className="btn btn-outline-success rounded">
                    Update Resume
                </button>
            </div>
        </form>
    );

    const adminRightSide = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">Update Information</h4>
                {successMessage()}
                {warningMessage()}
                {resumeForm()}
            </div>
        )
    }

    return (
        <Base title="Welcome to Profile area" className="container bg-success p-4">
            <div className="row">
                <div className="col-3">
                    {adminLeftSide()}
                </div>

                <div className="col-9">
                    {adminRightSide()}
                </div>

            </div>
        </Base>
    );
};

export default UserDashBoard;
