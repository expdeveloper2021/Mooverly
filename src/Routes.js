import React, { Component } from 'react'
import { Route, Router } from 'react-router-dom'
import SignUp from './Components/SignUp/SignUp'
import SignIn from './Components/SignIn/SignIn'
import DashboardRes from './Components/DashboardRestaurant/Dashboard'
import DashboardUser from './Components/UserDashBoard/Dashboard'

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
            </Router>
        )
    }
}

export default Routers
