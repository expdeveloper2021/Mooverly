import React, { Component } from 'react'
import { Link } from "react-router-dom"
import firebase from '../../Config/Fire'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import './Dashboard.css'


class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            lat: null,
            lng: null,
            stylish: {
                color: "black",
                fontSize: "15px",
                marginTop: "10px",
                marginRight: "2px"
            },
            styfish: {
                color: "black",
                fontSize: "15px",
                marginTop: "10px",
                marginRight: "2px",
                marginLeft: "10px"
            },
        }
        this.check = []
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
        firebase.database().ref("users/" + uid + "/location").on("value", (data) => {
            if (data.val() === null) {

            } else {
                this.props.history.push("/pending")
            }
        })
    }

    done() {
        let lat = this.state.lat
        let lng = this.state.lng
        let userObjLocate = {
            lat,
            lng
        }
        this.check.map((elem) => console.log(elem))
        firebase.database().ref("users/" + this.state.uid + "/location").set(userObjLocate)
        firebase.database().ref("users/" + this.state.uid + "/main").set(this.check.map((elem) => { return elem }))
        .then(() => {this.props.history.push("/pending")})
    }

    render() {
        const { lat, lng } = this.state

        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{ lat: lat, lng: lng }}
            >
                {props.isMarkerShown &&
                    <Marker position={{ lat: lat, lng: lng }} draggable={true} onDragEnd={(e) => this.setState({ lat: e.latLng.lat(), lng: e.latLng.lng() })} />}
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
                                <li><Link to="/Pending">Pending</Link></li>
                                <li><Link to="/Approved">Approved</Link></li>
                                <li><Link to="/Delivered">Delivered</Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="_"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <span style={{ marginLeft: "10px" }}><b>Note:</b> This is only one time process</span>
                <h3 style={{ color: "black", marginLeft: "10px" }}>Tell us your restaurant location to tell the users</h3>
                <MyMapComponent
                    isMarkerShown
                    location={{ lat, lng }}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px`, marginTop: "30px" }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />

                <h3 style={{ color: "black", marginTop: "20px" }}>Main Dishes of Your Restaurant</h3>
                <div style={{ marginRight: "5px" }}>
                    <label className="checkbox-inline" style={this.state.styfish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Karahi" />Karahi</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Tikka" />Tikka</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Nihari" />Nihari</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Barbeque" />Barbeque</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Biryani" />Biryani</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Chargha" />Chargha</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Handi" />Handi</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Katakat" />Katakat</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Paya" />Paya</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Kofta" />Kofta</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Chicken Makhni" />Chicken Makhni</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Zinger Burger" />Zinger Burger</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Beef Burger" />Beef Burger</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Daal Mash" />Daal Mash</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Paneer Reshmi" />Paneer Reshmi</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Palak Paneer" />Palak Paneer</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Seekh kabab" />Seekh kabab</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Gola Kabab" />Gola Kabab</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Dum Pukht" />Dum Pukht</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Chapli Kabab" />Chapli Kabab</label>
                    <label className="checkbox-inline" style={this.state.stylish}><input type="checkbox" onChange={(e) => this.check = [...this.check, e.target.value]} value="Chicken Malai Boti" />Chicken Malai Boti</label>
                </div>
                <button style={{ padding: "10px", width: "auto", float: "right", margin: "10px", border: "1px solid black", borderRadius: "3px" }} onClick={this.done.bind(this)}>Done</button>
            </>
        )
    }
}

export default Dashboard
