import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../Config/Fire'
import './Requests.css'

class Requests extends Component {

    constructor() {
        super()
        this.state = {
            fullData: [],
        }
    }

    componentDidMount() {
        let uid = localStorage.getItem("uid")
        firebase.database().ref("users/" + uid + "/myRequests").on("value", (data) => {
            this.setState({ fullData: [data.val()] })
        })
    }

    pending() {
        console.log("pending")
    }

    approve() {
        console.log("approve")
    }

    deliver() {
        console.log("delivered")
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
                                <li className="active"><Link to="/Requests">My Requests</Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="_"><span className="glyphicon glyphicon-log-in"></span>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="tabs">
                    <div>
                        <span onClick={this.pending.bind(this)}>Pending</span>
                    </div>
                    <div>
                        <span onClick={this.approve.bind(this)}>Approved</span>
                    </div>
                    <div>
                        <span onClick={this.deliver.bind(this)}>Delivered</span>
                    </div>
                </div>

                <div className="allInfo">
                    <table className="table table-striped" style={{ marginTop: "20px", width: "70%", margin: "0px auto" }}>
                        <thead>
                            <tr>
                                <td>Restaurant</td>
                                <td>Item Name</td>
                                <td>Price</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mateen Food</td>
                                <td>95$</td>
                                <td>Tikka</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Requests
