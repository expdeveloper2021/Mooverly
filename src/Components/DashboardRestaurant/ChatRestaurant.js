import React, { Component } from 'react'
import {Link} from 'react-router-dom'
 
class ChatRestaurant extends Component {
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
                <div class="container">
                    <h3 class=" text-center">Messaging</h3>
                    <div class="messaging">
                        <div class="inbox_msg">
                            <div class="inbox_people">
                                <div class="inbox_chat">
                                    <div class="chat_list active_chat">
                                        <div class="chat_people">
                                            <div class="chat_ib">
                                                <h5>Sunil Rajput</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mesgs">
                                <div class="msg_history">
                                    <div class="incoming_msg">
                                        <div class="received_msg">
                                            <div class="received_withd_msg">
                                                <p>Test which is a new approach to have all solutions</p>
                                                <span class="time_date"> 11:01 AM    |    June 9</span></div>
                                        </div>
                                    </div>
                                    <div class="outgoing_msg">
                                        <div class="sent_msg">
                                            <p>Test which is a new approach to have all solutions</p>
                                            <span class="time_date"> 11:01 AM    |    June 9</span> </div>
                                    </div>
                                    <div class="incoming_msg">
                                        <div class="received_msg">
                                            <div class="received_withd_msg">
                                                <p>Test, which is a new approach to have</p>
                                                <span class="time_date"> 11:01 AM    |    Yesterday</span></div>
                                        </div>
                                    </div>
                                    <div class="outgoing_msg">
                                        <div class="sent_msg">
                                            <p>Apollo University, Delhi, India Test</p>
                                            <span class="time_date"> 11:01 AM    |    Today</span> </div>
                                    </div>
                                    <div class="incoming_msg">
                                        <div class="received_msg">
                                            <div class="received_withd_msg">
                                                <p>We work directly with our designers and suppliers, and sell direct to you, which means quality, exclusive products, at a price anyone can afford.</p>
                                                <span class="time_date"> 11:01 AM    |    Today</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="type_msg">
                                    <div class="input_msg_write">
                                        <input type="text" class="write_msg" placeholder="Type a message" />
                                        <button class="msg_send_btn" type="button"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
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
