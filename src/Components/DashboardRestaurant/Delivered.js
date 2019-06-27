import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../Config/Fire'
import './Dashboard.css'


class Delivered extends Component {

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
        this.setState({ filtered: [] })
        firebase.database().ref("users/" + uid + "/allRequests").on("child_added", (data) => {
            let fullData = this.state.fullData
            let arr = []
            arr.push(data.val())
            fullData.push(arr)
            this.setState({ fullData })
            setTimeout(() => {
                let filtered = this.state.fullData.filter((e) => {
                    return e[0].status === "delivered"
                })
                this.setState({ filtered })
            }, 2000);
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
                                <li><Link to="/Approved">Approved</Link></li>
                                <li className="active"><Link to="/Delivered">Delivered</Link></li>
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
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filtered.length > 0 ? this.state.filtered.map((e) => {
                                return <tr key={Math.random(36)} className="stylish">
                                    <td>{e[0].item}</td>
                                    <td>{e[0].price}</td>
                                </tr>
                            }) : <tr><td>Searching...</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Delivered
