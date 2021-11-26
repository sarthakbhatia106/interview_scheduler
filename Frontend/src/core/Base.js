import React from 'react';
import NavBar from './NavBar'

const Base=({
    title="My title",
    className="bg-dark text-white p-4",
    children
})=>{
    return(
        <div>
            <NavBar/>
            <div className="container-fluid p-0">
                <div className="jumbotron bg-dark text-white text-center p-5 mb-4">
                    <h1 className="display-4">{title}</h1>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-auto fixed-bottom">
                <div className="container text-center">
                    <span className="text-muted" >
                        An amazing place to schedule <span className="text-white">interviews</span>
                    </span>
                </div>
            </footer>
        </div>
    )
}

export default Base;