import React, { Fragment } from 'react';
import { Link, withRouter } from "react-router-dom"
import { signout, isAutheticated } from "../auth/helper"

const currentTab = (history, path) => {
    if (history.location.pathname == path) {
        return { color: "#A4E6B0" }
    } else {
        return { color: "#FFFFFF" }
    }
}

const navBar = ({ history }) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/"> Home</Link>
                </li>
                
                {isAutheticated() && isAutheticated().user.role == "user" && (
                    <li className="nav-item">
                        <Link style={currentTab(history, "/user/profile")} className="nav-link" to="/user/profile"> Profile</Link>
                    </li>
                )}

                {isAutheticated() && isAutheticated().user.role == "admin" && (
                    <li className="nav-item">
                        <Link style={currentTab(history, "/admin/profile")} className="nav-link" to="/admin/profile"> A. Profile</Link>
                    </li>
                )}

                {!isAutheticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup"> Signup</Link>
                        </li>
                        <li className="nav-item">
                            <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin"> Signin</Link>
                        </li>
                    </Fragment>
                )}

                {isAutheticated() && (
                    <li className="nav-item">
                        <span
                            className="nav-link text-warning"
                            onClick={() => {
                                signout(() => {
                                    history.push("/")
                                    window.location.reload();
                                })
                            }}
                        >
                            Signout
                        </span>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default withRouter(navBar);