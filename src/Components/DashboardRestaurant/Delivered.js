import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../Config/Fire'
import './Dashboard.css'
import biryani from '../../Images/biryani.jpg'

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

                <h3 style={{ color: "black", textAlign: "center" }}>Delivered</h3>
                {this.state.fullData.length ? this.state.filtered.length ? <div className="infos">
                    <h3 style={{ marginLeft: '15%', color: 'black' }}>{this.state.txt}</h3>
                    {this.state.filtered.map((elem) => {
                        return <div className="card" key={Math.random(36)}>
                            <img className="card-img-top" src={biryani} alt="Card" style={{ width: "100%", height: "150px", borderRadius: "4px" }} />
                            <div className="card-body">
                                <h4 className="card-title" style={{ color: "black" }}>{elem[0].item}</h4>
                                <span>{elem[0].price}</span>
                            </div>
                        </div>
                    })}
                </div> : <h5>No Data Here</h5> : <h5>Searching...</h5>}
            </div>
        )
    }
}

export default Delivered
