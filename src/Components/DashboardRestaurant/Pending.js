import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../Config/Fire'

class Pending extends Component {

    constructor() {
        super()
    }

    componentDidMount() {
        let uid = localStorage.getItem("uid")
        firebase.database().ref("users/" + uid + "/allRequests").on("value" , (data)=>{
            console.log(data.val())
        })
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="_">Mooverly</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav">
                                <li className="active"><Link to="/Pending">Pending</Link></li>
                                <li><Link to="/Approved">Approved</Link></li>
                                <li><Link to="/Delivered">Delivered</Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="_"><span className="glyphicon glyphicon-log-in"></span>  Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Pending
