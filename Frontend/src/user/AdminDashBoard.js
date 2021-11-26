import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import {Link} from "react-router-dom";
import AddMeeting from "../admin/AddMeeting";


const AdminDashBoard = () => {

  const {user:{name,email,role}}= isAutheticated();

  const adminLeftSide=()=>{
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Information</h4>
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

  const adminRightSide=()=>{
    return (
        <div className="card mb-3">
          <h4 className="card-header">Create Meeting</h4>
          <AddMeeting/>
        </div>
      )
  }

  return (
    <Base title="Welcome to Admin area" className="container bg-success p-4">
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

export default AdminDashBoard;
