import React, { Component } from 'react'
import firebase from '../../Config/Fire'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import './SignUp.css'

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            // styling starts
            obje: {
                padding: "10px",
                width: "90%",
                borderRadius: "3px",
                border: "1px solid lightGray",
            },
            butto: {
                padding: "10px",
                marginTop: "10px",
                backgroundColor: "cyan",
                border: "1px solid lightGray",
                borderRadius: "3px",
                fontSize: "15px",
                fontWeight: "bold"
            },
            // styling ends

            // inputs validation
            name: '',
            email: '',
            gender: '',
            age: '',
            resName: '',
            country: '',
            city: '',
            password: '',
            confirmation: '',
            hidden: true,
            // inputs validation ends

            // for loader
            show: false,
            // loader ends

            // for restaurant
            inp: "Full Name:",
            // restaurant ends

            // check box
            isChecked1: true,
            isChecked2: false,
            // check box ends

        }
    }


    // for CHeckbox

    checked() {
        this.setState({
            isChecked1: !this.state.isChecked1,
            isChecked2: !this.state.isChecked2
        })
        this.state.isChecked1 && this.setState({ inp: "Owner Name:" })
        this.state.isChecked2 && this.setState({ inp: "Full Name:" })
    }

    // check box function ends

    // clicking the signUp button
    signUp() {
        const { name, email, gender, age, resName, img, country, city, password, confirmation } = this.state
        if (this.state.isChecked1) {
            if (name !== '' && email !== '' && gender !== '' && age !== '' && country !== '' && city !== '' &&
                password !== '' && confirmation !== '') {
                if (gender === "male" || gender === "Male" || gender === "female" || gender === "Female") {
                    if (password === confirmation) {
                        this.setState({ show: true })
                        firebase.auth().createUserWithEmailAndPassword(email, password)
                            .then((succ) => {
                                var user = firebase.auth().currentUser;
                                let userObj = {
                                    name,
                                    email,
                                    gender,
                                    age,
                                    country,
                                    city,
                                    type: 'user'
                                }
                                user.sendEmailVerification()
                                    .then((success) => {
                                        firebase.database().ref("users/" + succ.user.uid + "/info").set(userObj)
                                            .then((succc) => {
                                                this.setState({ show: false })
                                                this.props.history.push("/")
                                            })
                                            .catch((errors) => {
                                                console.log(errors)
                                            })
                                    })
                            })
                            .catch((err) => {
                                var errorMessage = err.message;
                                this.setState({ show: false })
                                swal({
                                    title: "Error Catched",
                                    text: errorMessage,
                                    icon: "error",
                                });
                            });
                    } else {
                        swal({
                            title: "Error Catched",
                            text: "Both passwords aren't matched",
                            icon: "error",
                        });
                    }
                } else {
                    swal({
                        title: "Error Catched",
                        text: "Gender should be male or female",
                        icon: "error",
                    });
                }
            } else {
                swal({
                    title: "Error Catched",
                    text: "Input fields can't be empty",
                    icon: "error",
                });
            }
        } else {
            if (name !== '' && email !== '' && resName !== '' && img !== '' && country !== '' && city !== '' &&
                password !== '' && confirmation !== '') {
                if (password === confirmation) {
                    this.setState({ show: true })
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then((succ) => {
                            var user = firebase.auth().currentUser;
                            let uid = succ.user.uid
                            let userObj = {
                                name,
                                email,
                                resName,
                                country,
                                city,
                                uid,
                                type: 'restaurant',
                                stars: 0,
                                categories: '',
                            }
                            user.sendEmailVerification()
                                .then((success) => {
                                    let storageRef = firebase.storage().ref().child(`restaurantImages/${img.name}`)
                                    storageRef.put(img)
                                        .then((snapshot) => {
                                            snapshot.ref.getDownloadURL().then((snapUrl) => {
                                                userObj.photoURL = snapUrl
                                                firebase.database().ref("users/" + succ.user.uid + "/info").set(userObj)
                                                    .then((succc) => {
                                                        this.setState({ show: false })
                                                        this.props.history.push("/")
                                                    })
                                                    .catch((errors) => {
                                                        console.log(errors)
                                                    })
                                            })
                                        })
                                })
                        })
                        .catch((err) => {
                            var errorMessage = err.message;
                            this.props.history.push("/")
                            swal({
                                title: "Error Catched",
                                text: errorMessage,
                                icon: "error",
                            });
                        });
                } else {
                    swal({
                        title: "Error Catched",
                        text: "Both passwords aren't matched",
                        icon: "error",
                    });
                }
            } else {
                swal({
                    title: "Error Catched",
                    text: "Input fields can't be empty",
                    icon: "error",
                });
            }
        }
    }


    render() {
        return (
            <div className="main">
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
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="javascript:void(0)"><span className="glyphicon glyphicon-log-in"></span>  Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <h2 style={{ textAlign: "center", color: "black" }}>Sign Up</h2>
                <div style={{ width: "90%", margin: "0px auto", padding: "10px", textAlign: "center" }}>
                    <label className="checkbox-inline" style={{ fontSize: "15px" }}><input type="checkbox" checked={this.state.isChecked1} onChange={this.checked.bind(this)} value="user" />User</label>
                    <label className="checkbox-inline" style={{ fontSize: "15px" }}><input type="checkbox" checked={this.state.isChecked2} onChange={this.checked.bind(this)} value="restaurant" />Restaurant</label>
                </div>
                <div className="autos">
                    <div>
                        <label style={{ color: "black" }}>{this.state.inp}</label>
                        <br />
                        <input type="text" style={this.state.obje} value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div>
                        <label style={{ color: "black" }}>Email:</label>
                        <br />
                        <input type="email" style={this.state.obje} value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                    </div>
                    {this.state.isChecked1 ?
                        <>
                            <div>
                                <label style={{ color: "black" }}>Gender:</label>
                                <br />
                                <input type="text" placeholder="Male or Female only" value={this.state.gender} style={this.state.obje} onChange={(e) => this.setState({ gender: e.target.value })} />
                            </div>
                            <div>
                                <label style={{ color: "black" }}>Age:</label>
                                <br />
                                <input type="number" style={this.state.obje} value={this.state.age} onChange={(e) => this.setState({ age: e.target.value })} />
                            </div>
                        </> :
                        <>
                            <div>
                                <label style={{ color: "black" }}>Restaurant Name:</label>
                                <br />
                                <input type="text" style={this.state.obje} value={this.state.resName} onChange={(e) => this.setState({ resName: e.target.value })} />
                            </div>
                            <div>
                                <label style={{ color: "black" }}>Restaurant Picture:</label>
                                <br />
                                <input type="file" style={this.state.obje} onChange={(e) => this.setState({ img: e.target.files[0] })} />
                            </div>
                        </>
                    }

                    <div>
                        <label style={{ color: "black" }}>Country:</label>
                        <br />
                        <input type="text" style={this.state.obje} value={this.state.country} onChange={(e) => this.setState({ country: e.target.value })} />
                    </div>
                    <div>
                        <label style={{ color: "black" }}>City:</label>
                        <br />
                        <input type="text" style={this.state.obje} value={this.state.city} onChange={(e) => this.setState({ city: e.target.value })} />
                    </div>
                    <div>
                        <label style={{ color: "black" }}>Password:</label>
                        <br />
                        <input type={this.state.hidden ? "password" : "text"} value={this.state.password} style={this.state.obje} onChange={(e) => this.setState({ password: e.target.value })} />
                    </div>
                    <div>
                        <label style={{ color: "black" }}>Confirm Password:</label>
                        <br />
                        <input type={this.state.hidden ? "password" : "text"} value={this.state.confirmation} style={this.state.obje} onChange={(e) => this.setState({ confirmation: e.target.value })} />
                    </div>
                    <div>
                        <label className="checkbox-inline" style={{ color: "black" }}><input type="checkbox" onClick={() => this.setState({ hidden: !this.state.hidden })} />Show Password</label>
                    </div>
                    <div>
                        <button style={this.state.butto} onClick={this.signUp.bind(this)}>
                            Sign Up
                        </button>
                    </div>
                    <div>
                        <span style={{ color: "black" }}>Already have an account? <Link to="/" style={{ color: "black", textDecoration: "underline", fontWeight: "bold" }}>Sign In here</Link></span>
                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    {this.state.show && <div className="lds-facebook"><div></div><div></div><div></div></div>}
                </div>
            </div>
        )
    }
}

export default SignUp
