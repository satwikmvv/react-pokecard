import React, { Component } from 'react';
import './Login.css'
import firebase from './firebase';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
        this.handleUpdate=this.handleUpdate.bind(this)
        this.handleLogin=this.handleLogin.bind(this);
        this.handleSignIn=this.handleSignIn.bind(this)
    }

    handleSignIn(e){
        e.preventDefault()
        // console.log(this.state)
        firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error)
            // ...
          });
    }

    handleLogin(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
        .then((res)=>console.log(res))
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error)
            // ...
          });
    }

    handleUpdate= (e)=>{
        this.setState({
          [e.target.name]: e.target.value
        });
        
      }

    componentDidMount(){

    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <form onSubmit={this.handleLogin}>
                    Username:<input type='text' name='username' placeholder='Enter Username' onChange={this.handleUpdate} value={this.state.username}/>
                    password:<input type='text' name='password' placeholder='Enter Password' onChange={this.handleUpdate} value={this.state.password}/>
                    <button>Login</button>
                </form>
                <br />
                <br />
                <h3>Signup</h3>
                <form onSubmit={this.handleSignIn}>
                    Username:<input type='text' name='username' placeholder='Enter Username' onChange={this.handleUpdate} value={this.state.username}/>
                    password:<input type='text' name='password' placeholder='Enter Password' onChange={this.handleUpdate} value={this.state.password}/>
                    <button>Signup</button>
                </form>
            </div>
        );
    }
}

export default Login;