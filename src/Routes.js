import React, { Component } from 'react'
import { Route, Router } from 'react-router-dom'
import SignUp from './Components/SignUp/SignUp'
import SignIn from './Components/SignIn/SignIn'
import DashboardRes from './Components/DashboardRestaurant/Dashboard'
import DashboardUser from './Components/UserDashBoard/Dashboard'
import Restaurants from './Components/UserDashBoard/Restaurants'
import DeepRestaurant from './Components/UserDetail/DeepRestaurant'
import Requests from './Components/UserDashBoard/Requests';
import Pending from './Components/DashboardRestaurant/Pending'
import Approved from './Components/DashboardRestaurant/Approved'
import Delivered from './Components/DashboardRestaurant/Delivered';

const CreateBrowserHistory = require("history").createBrowserHistory
const history = CreateBrowserHistory()

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <Route exact path="/" component={SignIn} />
                <Route path="/signUp" component={SignUp} />
                <Route path="/Restaurant" component={DashboardRes} />
                <Route path="/User" component={DashboardUser} />
                <Route path="/resta" component={Restaurants} />
                <Route path="/deep" component={DeepRestaurant} />
                <Route path="/Requests" component={Requests} />
                <Route path="/Pending" component={Pending} />
                <Route path="/Approved" component={Approved} />
                <Route path="/Delivered" component={Delivered} />
            </Router>
        )
    }
}

export default Routers
