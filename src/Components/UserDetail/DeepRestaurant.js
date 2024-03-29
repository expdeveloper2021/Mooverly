import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../Config/Fire'
import './allInfo.css'
import allTimes from '../../Images/allTimes.jpg'
import swal from 'sweetalert';

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

    order(e) {
        let resId = this.state.allInfo.uid
        let myId = firebase.auth().currentUser.uid
        let pushRestaurant = firebase.database().ref("users/" + resId + "/allRequests").push().key
        let pushUser = firebase.database().ref("users/" + myId + "/myRequests").push().key
        let userObj = {
            item: e,
            price: "999 Rs",
            uid: myId,
            status: "pending",
            pushRestaurant,
            pushUser,
        }
        let userObj1 = {
            item: e,
            price: "999 Rs",
            uid: resId,
            status: "pending",
            pushRestaurant,
            pushUser,
        }
        firebase.database().ref("users/" + resId + "/allRequests/" + pushRestaurant).set(userObj).then(() => {
            firebase.database().ref("users/" + myId + "/myRequests/" + pushUser).set(userObj1).then(() => {
                swal({
                    title: 'Nice!',
                    text: 'Order Placed Successfully',
                    icon: 'success'
                })
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
                                    <li><a href="javascript:void(0)"><span className="glyphicon glyphicon-log-in"></span>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>


                {this.state.allInfo.length !== 0 &&
                    <div className="purpose" style={{ width: "80%", margin: "0px auto", height: "auto", padding: "10px" }}>
                        <img src={this.state.allInfo.photoURL} width="100%" alt="Restaurant Pic" className="img2" style={{ backgroundRepeat: "no-repeat", backgroundSize: "contain", opacity: "0.8", borderRadius: "40px" }} />
                        <div className="infos">
                            <h3>Food Categories</h3>
                            {this.state.arrCateg.map((elem) => {
                                return <div className="card" key={Math.random(36)}>
                                    <img className="card-img-top" src={allTimes} alt="Card" style={{ width: "100%", height: "150px", borderRadius: "4px" }} />
                                    <div className="card-body">
                                        <h4 className="card-title" style={{ color: "black" }}>{elem}</h4>
                                        <span>Price: 999 Rs</span>
                                        <br />
                                        <button className="btn btn-primary" style={{ float: "right", marginTop: "10px" }} onClick={this.order.bind(this, elem)}>Order</button>
                                    </div>
                                </div>
                            })}
                        </div>
                        <div style={{ width: "80%", margin: "10px auto", textAlign: "center" }} >
                            <button className="btn btn-primary" onClick={() => this.props.history.push("/chat")}>Chat Restaurant</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default DeepRestaurant
