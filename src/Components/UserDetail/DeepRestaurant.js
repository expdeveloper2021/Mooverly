import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../Config/Fire'
import './allInfo.css'
import allTimes from '../../Images/allTimes.jpg'
import { swal } from 'sweetalert'

class DeepRestaurant extends Component {

    constructor() {
        super()
        this.state = {
            allInfo: []
        }
    }

    componentDidMount() {
        let uid = localStorage.getItem("resUid")
        this.setState({ uid })
        firebase.database().ref("users/" + uid).on("value", (data) => {
            let arrCateg = data.val().main
            arrCateg.shift()
            this.setState({ allInfo: data.val().info, arrCateg })
        })
    }

    order(e, p) {
        let resId = this.state.allInfo.uid
        let myId = firebase.auth().currentUser.uid
        let userObj = {
            item: e,
            price: p,
            uid: myId,
            status: "pending",
        }
        let userObj1 = {
            item: e,
            price: p + "$",
            uid: resId,
            status: "pending",
        }
        firebase.database().ref("users/" + resId + "/allRequests").push(userObj)
        firebase.database().ref("users/" + myId + "/myRequests").push(userObj1).then(() => {
            swal({
                title: "Done",
                text: "Order Placed Successfully",
                icon: 'success'
            })
        })
    }

    render() {

        return (
            <div>
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
                                    <li className="active"><Link to="/Restaurants">Restaurants</Link></li>
                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a href="_"><span className="glyphicon glyphicon-log-in"></span>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>


                {this.state.allInfo.length !== 0 &&
                    <div className="purpose" style={{ width: "80%", margin: "0px auto", height: "auto", border: "1px solid gray", padding: "10px" }}>
                        <img src={this.state.allInfo.photoURL} width="100%" alt="Restaurant Pic" height="350px" style={{ backgroundRepeat: "no-repeat", backgroundSize: "contain", opacity: "0.8", borderRadius: "40px" }} />
                        <div className="infos">
                            <h3>Food Categories</h3>
                            {this.state.arrCateg.map((elem) => {
                                const price = Math.floor(Math.random(1) * 50)
                                return <div className="card" key={Math.random(36)}>
                                    <img className="card-img-top" src={allTimes} alt="Card" style={{ width: "100%", height: "150px", borderRadius: "4px" }} />
                                    <div className="card-body">
                                        <h4 className="card-title" style={{ color: "black" }}>{elem}</h4>
                                        <span>Price: {price}$</span>
                                        <br />
                                        <button className="btn btn-primary" style={{ float: "right", marginTop: "15px" }} onClick={this.order.bind(this, elem, price)}>Order</button>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default DeepRestaurant
