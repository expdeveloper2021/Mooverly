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
            show: "none",
            txt: '',
            stars: false,
            allStars: ''
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
        this.setState({ show: "inline", stars: false })
        setTimeout(() => {
            let filtered = this.state.fullData.filter((e) => {
                return e[0].status === "pending"
            })
            this.setState({ filtered, show: "none", txt: 'Pending' })
        }, 2000);
    }

    approve() {
        this.setState({ show: "inline", filtered: [], txt: '', stars: false })
        setTimeout(() => {
            let filtered = this.state.fullData.filter((e) => {
                return e[0].status === "approved"
            })
            this.setState({ filtered, show: "none", txt: 'Approved' })
        }, 2000);
    }

    deliver() {
        this.setState({ show: "inline", filtered: [], txt: '', stars: true })
        setTimeout(() => {
            let filtered = this.state.fullData.filter((e) => {
                return e[0].status === "delivered"
            })
            this.setState({ filtered, show: "none", txt: 'Delivered' })
        }, 2000);
    }

    provide(e) {
        console.log(e)
        firebase.database().ref("users/" + e + "/info").on("value", (data) => {
            this.setState({allStars: data.val().stars})
        })
        firebase.database().ref("users/" + e + "/info").update({stars: Number(this.state.allStars) + 1})
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
                            <a className="navbar-brand" href="javascript:void(0)">Mooverly</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav">
                                <li className="active"><Link to="/Requests">My Requests</Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="javascript:void(0)"><span className="glyphicon glyphicon-log-in"></span>Logout</a></li>
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

                {this.state.filtered.length ? <div className="allInfo">
                    <h3 style={{ marginLeft: '15%', color: 'black' }}>{this.state.txt}</h3>
                    <table className="table table-striped std" style={{ marginTop: "20px", margin: "0px auto" }}>
                        <thead>
                            <tr>
                                <td>Item Name</td>
                                <td>Price</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filtered.map((e) => {
                                return <tr key={Math.random(36)}>
                                    <td>{e[0].item}</td>
                                    <td>{e[0].price}</td>
                                    {this.state.stars && <td><button className="btn btn-primary" onClick={this.provide.bind(this, e[0].uid)}>Provide a star</button></td>}
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div> : <h5>Something went wrong</h5>}
                <div style={{ width: "50%", textAlign: "center", marginLeft: "50%" }}>
                    <div className="lds-ring" style={{ display: this.state.show }}><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        )
    }
}

export default Requests
