import React, { Component } from 'react';
import App from './App';
import Login from './Login'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/'>Form</Link>
                        </li>
                    </ul>
                    
                    <Route exact path='/' component={App} />
                    <Route path='/login' component={Login} />

                </div>
            </Router>
        );
    }
}

export default Home;
