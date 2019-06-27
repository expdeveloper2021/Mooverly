import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../Config/Fire'

class ChatRestaurant extends Component {

    constructor() {
        super()
        this.state = {
            input: '',
            namesArr: [],
            allMsgs: []
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.getData()
        }, 3000);
    }

    getData() {
        firebase.database().ref("users").on("value", (data) => {
            this.setState({
                namesArr: []
            })
            let daat = Object.entries(data.val())
            for (let i = 0; i < daat.length; i++) {
                let namesArr = this.state.namesArr
                if (daat[i][1].info.type === "user") {
                    namesArr.push([daat[i][1].info.name, daat[i][1].info.uid])
                    this.setState({
                        namesArr
                    })
                }
            }
        })
    }

    hist(uid) {
        this.setState({
            senderId: uid,
            allMsgs: []
        })
        firebase.database().ref("chatRooms/" + localStorage.getItem("resUid") + "/" + this.state.senderId).on("value", (data) => {
            let msgs = []
            if (data.val() !== null) {
                let a = Object.entries(data.val())
                for (let i = 0; i < a.length; i++) {
                    msgs.push(a[i][1])
                }
                this.setState({
                    allMsgs: msgs,
                })
            }
        })
    }

    send() {
        let UIDS = this.state.senderId
        if (UIDS !== undefined) {
            firebase.database().ref("chatRooms/" + firebase.auth().currentUser.uid + "/" + UIDS).push({ "myMsg": this.state.msg })
            firebase.database().ref("chatRooms/" + UIDS + "/" + firebase.auth().currentUser.uid).push({ "senderMsg": this.state.msg })
        } else {
            alert("Please select one user to chat")
        }
        this.setState({
            msg: "",
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
                            <a className="navbar-brand" href="javascript:void(0)">Mooverly</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav">
                                <li><Link to="/Pending">Pending</Link></li>
                                <li><Link to="/Approved">Approved</Link></li>
                                <li><Link to="/Delivered">Delivered</Link></li>
                                <li className="active"><Link to="/chatRestaurant">My Chats</Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="javascript:void(0)"><span className="glyphicon glyphicon-log-in"></span>  Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <h3 className=" text-center">Messaging</h3>
                    <div className="messaging">
                        <div className="inbox_msg">
                            <div className="inbox_people">
                                <div className="inbox_chat">
                                    {this.state.namesArr.length > 0 && this.state.namesArr.map((e) => {
                                        return <div className="chat_list active_chat" key={Math.random(36)}>
                                            <div className="chat_people">
                                                <div className="chat_ib">
                                                    <h5 style={{ cursor: "pointer" }} onClick={this.hist.bind(this, e[1])}>{e[0]}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className="mesgs">
                                <div className="msg_history">
                                    {this.state.allMsgs !== [] ?
                                        this.state.allMsgs.map((data) => {
                                            if ("myMsg" in data) {
                                                return <div className="outgoing_msg">
                                                    <div className="sent_msg">
                                                        <p>{data.myMsg}</p>
                                                    </div>
                                                </div>
                                            } else {
                                                return (
                                                    <div className="incoming_msg">
                                                        <div className="received_msg">
                                                            <div className="received_withd_msg">
                                                                <p>{data.senderMsg}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }) : console.log("No data yet")}
                                </div>
                                <div className="type_msg">
                                    <div className="input_msg_write">
                                        <input type="text" className="write_msg" placeholder="Type a message" value={this.state.msg} onChange={(e) => this.setState({ msg: e.target.value })} />
                                        <button className="msg_send_btn" type="button" onClick={this.send.bind(this)}><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatRestaurant
