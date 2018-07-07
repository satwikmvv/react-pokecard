import React, { Component } from 'react';
import App from './App';
import Login from './Login'
import Home from './Home'
import SignUp from './Signup'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Links extends Component {
    render() {
        return (
            <Router>
                <div>
                    {/* <ul>
                        
                        <li>
                            <Link to='/signup'>SignUp</Link>
                        </li>
                        <li>
                            <Link to='/dashboard'>Form</Link>
                        </li>
                        <li>
                            <Link to='/Login'>Login</Link>
                        </li>
                    </ul> */}
                    
                    <Route exact path='/' component={Home} />
                    <Route path='/dashboard' component={App} />
                    <Route path='/Login' component={Login} />
                    <Route path='/signup' component={SignUp} />
                    
                </div>
            </Router>
        );
    }
}

export default Links;
