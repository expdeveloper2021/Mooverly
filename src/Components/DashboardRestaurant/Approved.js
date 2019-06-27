import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../Config/Fire'
import './Dashboard.css'


class Approved extends Component {

    constructor() {
        super()
        this.state = {
            fullData: [],
            filtered: []
        }
    }

    componentDidMount() {
        this.get()
    }

    get() {
        let uid = localStorage.getItem("uid")
        firebase.database().ref("users/" + uid + "/allRequests").on("child_added", (data) => {
            let fullData = this.state.fullData
            let arr = []
            arr.push(data.val())
            fullData.push(arr)
            this.setState({ fullData })
            setTimeout(() => {
                let filtered = this.state.fullData.filter((e) => {
                    return e[0].status === "approved"
                })
                this.setState({ filtered })
            }, 2000);
        })
    }

    approve(e, rest, user) {
        let userUid = e
        let myUid = firebase.auth().currentUser.uid
        firebase.database().ref("users/" + myUid + "/allRequests/" + rest).update({ status: "delivered" })
        firebase.database().ref("users/" + userUid + "/myRequests/" + user).update({ status: "delivered" }).then(() => {
            this.setState({ fullData: [], filtered: [] })
            this.get()
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
                                <li><Link to="/Pending">Pending</Link></li>
                                <li className="active"><Link to="/Approved">Approved</Link></li>
                                <li><Link to="/Delivered">Delivered</Link></li>
                                <li><Link to="/chatRestaurant">My Chats</Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="javascript:void(0)"><span className="glyphicon glyphicon-log-in"></span>  Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="allInfo">
                    <table className="table table-striped std" style={{ marginTop: "20px", margin: "0px auto" }}>
                        <thead>
                            <tr>
                                <td>Item Name</td>
                                <td>Price</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filtered.length > 0 ? this.state.filtered.map((e) => {
                                return <tr key={Math.random(36)} className="stylish">
                                    <td>{e[0].item}</td>
                                    <td>{e[0].price}</td>
                                    <td><button className="btn btn-default" onClick={this.approve.bind(this, e[0].uid, e[0].pushRestaurant, e[0].pushUser)}>Delivered</button></td>
                                </tr>
                            }) : <tr><td>Searching...</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Approved
