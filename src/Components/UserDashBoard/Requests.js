import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../Config/Fire'
import './Requests.css'

class Requests extends Component {

    constructor() {
        super()
        this.state = {
            fullData: [],
            filtered: [],
            show: "none"
        }
    }

    componentDidMount() {
        let uid = localStorage.getItem("uid")
        firebase.database().ref("users/" + uid + "/myRequests").on("child_added", (data) => {
            let fullData = this.state.fullData
            let arr = []
            arr.push(data.val())
            fullData.push(arr)
            this.setState({ fullData })
        })
    }

    pending() {
        this.setState({ show: "inline" })
        console.log("pending")
        setTimeout(() => {
            let filtered = this.state.fullData.filter((e) => {
                return e[0].status === "pending"
            })
            console.log(filtered)
            if (filtered === []) {
                let filtered = "No pending deliveries"
            }
            this.setState({ filtered, show: "none" })
        }, 2000);
    }

    approve() {
        console.log("approve")
        this.setState({ show: "inline" , filtered: [] })
        setTimeout(() => {
            let filtered = this.state.fullData.filter((e) => {
                return e[0].status === "approved"
            })
            console.log(filtered)
            if (filtered === []) {
                let filtered = "No approved deliveries"
            }
            this.setState({ filtered, show: "none" })
        }, 2000);
    }

    deliver() {
        console.log("delivered")
        this.setState({ show: "inline" , filtered: [] })
        setTimeout(() => {
            let filtered = this.state.fullData.filter((e) => {
                return e[0].status === "delivered"
            })
            console.log(filtered)
            if (filtered === []) {
                let filtered = "No delivered deliveries"
            }
            this.setState({ filtered, show: "none" })
        }, 2000);
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
                    <table className="table table-striped std" style={{ marginTop: "20px", margin: "0px auto" }}>
                        <thead>
                            <tr>
                                <td>Item Name</td>
                                <td>Price</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filtered.length ? this.state.filtered.map((e) => {
                                return <tr key={Math.random(36)}>
                                    <td>{e[0].item}</td>
                                    <td>{e[0].price}</td>
                                </tr>
                            }): <h3>No posts here</h3> }
                        </tbody>
                    </table>
                </div>

                <div className="lds-ring" style={{ display: this.state.show }}><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
}

export default Requests
