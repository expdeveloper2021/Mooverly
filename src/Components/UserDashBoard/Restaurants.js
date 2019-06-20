import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../Config/Fire'
import * as geolib from 'geolib'

class Restaurants extends Component {

    constructor() {
        super()
        this.state = {
            fullLocation: [],
            userLocation: [],
        }
    }

    componentDidMount() {
        let uid = localStorage.getItem("uid")
        firebase.database().ref("users/" + uid + "/location").on("value", (data) => {
            let userLocation =  this.state.userLocation            
            let arr = []
            arr.push(data.val().lat , data.val().lng)
            userLocation.push(arr)
            this.setState({userLocation})
        })
        firebase.database().ref("users").on("value", (data) => {
            let a = Object.entries(data.val())
            for (let i = 0; i < a.length; i++) {
                if (a[i][1].info.type === "restaurant") {
                    let fullLocation = this.state.fullLocation
                    let arr = []
                    arr.push(a[i][1].location.lat, a[i][1].location.lng)
                    fullLocation.push(arr)
                    this.setState({ fullLocation })
                    console.log(this.state.fullLocation, ' full LOcation ')
                    console.log(this.state.userLocation, "user location")
                    console.log(
                        geolib.getPreciseDistance(
                            { latitude: this.state.fullLocation[0][0], longitude: this.state.fullLocation[0][1] },
                            { latitude: this.state.userLocation[0][0], longitude: this.state.userLocation[0][1] }
                        )
                    )
                }
            }
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
                                <li className="active"><Link to="/Restaurants">Restaurants</Link></li>
                                <li><Link to="/Requests">My Requests</Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="_"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Restaurants
