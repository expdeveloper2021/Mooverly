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
            someCateg: [],
            show: 'active',
            show1: '',
        }
    }

    componentDidMount() {
        let uid = localStorage.getItem("uid")
        firebase.database().ref("users").on("value", (data) => {
            this.setState({ infoAll: [] })
            let a = Object.entries(data.val())
            let infoAll = this.state.infoAll
            let someCateg = this.state.someCateg
            for (let i = 0; i < a.length; i++) {
                if (a[i][1].info.type === "restaurant") {
                    let arr = []
                    arr.push(a[i][1].info)
                    infoAll.push(arr)
                    let arrCate = []
                    arrCate.push(a[i][1].main)
                    arrCate[0].shift()
                    someCateg.push(arrCate)
                }
            }
            this.setState({ infoAll, someCateg, uid })
        })
    }

    detail(value) {
        localStorage.setItem("resUid", value)
        this.props.history.push("/deep")
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

                <div style={{ width: "100%" , textAlign: "center"}}>
                    <h2 style={{ color: "black", textAlign: "center" }}>All Restaurants</h2>
                    {this.state.infoAll.map((elem) => {
                        return <div className="card" key={Math.random(36)}>
                            <img className="card-img-top" src={logo} alt="Card" style={{ width: "100%", borderRadius: "4px" }} />
                            <div className="card-body">
                                <h4 className="card-title" style={{ color: "blue" }}>{elem[0].resName}</h4>
                                <span style={{ color: "cyan" }}><i><q>Deliciousness jumping into the mouth</q></i></span>
                                <button className="btn btn-default" style={{ float: "right", marginTop: "30px" }} onClick={this.detail.bind(this, elem[0].uid)}>Detail</button>
                            </div>
                        </div>
                    })}
                </div>



            </div>
        )
    }
}

export default Restaurants

        // let fullLocation = this.state.fullLocation
        // let arr = []
        // arr.push(a[i][1].location.lat, a[i][1].location.lng)
        // fullLocation.push(arr)
// this.setState({fullLocation})
                // console.log(this.state.fullLocation, ' full LOcation ')
                // console.log(this.state.userLocation, "user location")
                // console.log(
                //     geolib.getPreciseDistance(
//         {latitude: this.state.fullLocation[0][0], longitude: this.state.fullLocation[0][1] },
//         {latitude: this.state.userLocation[0][0], longitude: this.state.userLocation[0][1] }
                //     )
// )