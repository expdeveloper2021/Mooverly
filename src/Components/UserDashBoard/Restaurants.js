import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../Config/Fire'
import logo from '../../Images/restaurant.jpg'
import './Dashboard.css'
// import * as geolib from 'geolib'

class Restaurants extends Component {

    constructor() {
        super()
        this.state = {
            infoAll: [],
            show: 'active',
            show1: '',
            filtered: [],
        }
    }

    componentDidMount() {
        let uid = localStorage.getItem("uid")
        firebase.database().ref("users").on("value", (data) => {
            this.setState({ infoAll: [] })
            let a = Object.entries(data.val())
            let infoAll = this.state.infoAll
            for (let i = 0; i < a.length; i++) {
                if (a[i][1].info.type === "restaurant") {
                    let arr = []
                    arr.push(a[i][1].info)
                    infoAll.push(arr)
                }
            }
            this.setState({ infoAll, uid })
        })
    }

    detail(value) {
        localStorage.setItem("resUid", value)
        this.props.history.push("/deep")
    }

    filter(es) {
        let filtered = this.state.infoAll.filter((e) => {
            return e[0].resName.includes(es.target.value)
        })
        this.setState({ filtered })
        console.log(this.state.filtered)
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
                                    <li className={this.state.show} onClick={() => this.setState({ show: 'active', show1: '' })} ><Link to="/resta">Restaurants</Link></li>
                                    <li className={this.state.show1} onClick={() => this.setState({ show: '', show1: 'active' })}><Link to="/Requests">My Requests</Link></li>
                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a href="_"><span className="glyphicon glyphicon-log-in"></span>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
    
                    <div style={{ width: '80%', margin: '0px auto' }}>
                        <input placeholder="Search Restaurants.." onChange={this.filter.bind(this)} style={{ width: "100%", padding: '10px', height: "40px", borderRadius: "10px", border: '1px solid white' }} />
                    </div>
    
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <h2 style={{ color: "black", textAlign: "center" }}>All Restaurants</h2>
                        {this.state.filtered.length ? this.state.filtered.map((elem) => {
                            return <div className="card" key={Math.random(36)}>
                                <img className="card-img-top" src={logo} alt="Card" style={{ width: "100%", borderRadius: "4px" }} />
                                <div className="card-body">
                                    <h4 className="card-title" style={{ color: "blue" }}>{elem[0].resName}</h4>
                                    <span style={{ color: "darkcyan" }}><i><q>Deliciousness jumping into the mouth</q></i></span>
                                    <button className="btn btn-default" style={{ float: "right", marginTop: "30px" }} onClick={this.detail.bind(this, elem[0].uid)}>Detail</button>
                                </div>
                            </div>
                        }):  this.state.infoAll.map((elem) => {
                            return <div className="card" key={Math.random(36)}>
                                <img className="card-img-top" src={logo} alt="Card" style={{ width: "100%", borderRadius: "4px" }} />
                                <div className="card-body">
                                    <h4 className="card-title" style={{ color: "blue" }}>{elem[0].resName}</h4>
                                    <span style={{ color: "darkcyan" }}><i><q>Deliciousness jumping into the mouth</q></i></span>
                                    <button className="btn btn-default" style={{ float: "right", marginTop: "30px" }} onClick={this.detail.bind(this, elem[0].uid)}>Detail</button>
                                </div>
                            </div>})}
                    </div>
    
    
    
                </div>
            )
        }

}

export default Restaurants
