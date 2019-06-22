import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../Config/Fire'
import './allInfo.css'


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
            this.setState({ allInfo: data.val().info })
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
                        <img src={this.state.allInfo.photoURL} width="100%" alt="Restaurant Pic" />
                        <div className="infos">
                            
                            <br />
                        </div>
                    </div>
                }


            </div>
        )
    }
}

export default DeepRestaurant
