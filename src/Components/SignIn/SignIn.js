import React, { Component } from 'react'
import firebase from '../../Config/Fire'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import './SignIn.css'

class SignIn extends Component {
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
            email: '',
            password: '',
            hidden: true,
            // inputs validation ends

            // for loader
            show: false
            // loader ends

        }
    }

    // clicking the signUp button
    signIn() {
        const { email, password } = this.state
        if (email !== '' && password !== '') {
            this.setState({ show: true })
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((succ) => {
                    this.setState({ show: false })
                    localStorage.setItem("uid", succ.user.uid)
                    if (succ.user.emailVerified === false) {
                        swal({
                            title: "Oops",
                            text: "Your email is not verified.We have sent a code to your email address. Please check it and then proceed further for more.",
                            icon: "error",
                        });
                    } else {
                        firebase.database().ref("users/" + succ.user.uid + "/info").on("value", (data) => {
                            let datas = data.val()
                            if (datas.type === "user") {
                                this.props.history.push("/User")
                            } else {
                                this.props.history.push("/Restaurant")
                            }
                        })
                    }
                })
                .catch((error) => {
                    var errorMessage = error.message;
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
                text: "Input fields can't be empty",
                icon: "error",
            });
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
                                <li><a href="_"><span className="glyphicon glyphicon-log-in"></span>  Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <h2 style={{ textAlign: "center", color: "black" }}>Sign In</h2>
                <div className="autos">
                    <div>
                        <label style={{ color: "black" }}>Email:</label>
                        <br />
                        <input type="email" style={this.state.obje} value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                    </div>
                    <div>
                        <label style={{ color: "black" }}>Password:</label>
                        <br />
                        <input type={this.state.hidden ? "password" : "text"} value={this.state.password} style={this.state.obje} onChange={(e) => this.setState({ password: e.target.value })} />
                    </div>
                    <div>
                        <label className="checkbox-inline" style={{ color: "black" }}><input type="checkbox" onClick={() => this.setState({ hidden: !this.state.hidden })} />Show Password</label>
                    </div>
                    <div>
                        <button style={this.state.butto} onClick={this.signIn.bind(this)}>
                            Sign In
                        </button>
                    </div>
                    <div>
                        <span style={{ color: "black" }}>Want to create an account? <Link to="/signUp" style={{ color: "black", textDecoration: "underline", fontWeight: "bold" }}>Sign Up here</Link></span>
                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    {this.state.show && <div className="lds-facebook"><div></div><div></div><div></div></div>}
                </div>
            </div>
        )
    }
}

export default SignIn
