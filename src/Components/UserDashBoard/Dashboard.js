import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import './Dashboard.css'
import firebase from '../../Config/Fire'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            lat: '',
            lng: ''
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((location) => {
            this.setState({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            })
        });
        let uid = localStorage.getItem("uid")
        this.setState({ uid })
    }

    done() {
        let lat = this.state.lat
        let lng = this.state.lng
        let userObj = {
            lat,
            lng
        }
        firebase.database().ref("users/" + this.state.uid + "/location").set(userObj)
        .then(()=>{
            this.props.history.push("/resta")
        })
    }

    render() {
        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
            >
                {props.isMarkerShown &&
                    <Marker position={{ lat: this.state.lat, lng: this.state.lng }} draggable={true} onDragEnd={(e) => this.setState({ lat: e.latLng.lat(), lng: e.latLng.lng() })} />}
            </GoogleMap>
        ))
        return (
            <>
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
                                <li><Link to="/resta">Restaurants</Link></li>
                                <li><Link to="/Requests">My Requests</Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="_"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <h3 style={{ color: "black" }}>Please tell us your location to saw nearby restaurants</h3>
                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />

                <button style={{ padding: "10px", width: "auto", float: "right", margin: "10px", border: "1px solid black", borderRadius: "3px" }} onClick={this.done.bind(this)}>Done</button>

            </>
        )
    }
}

export default Dashboard
