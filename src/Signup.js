import React, { Component } from 'react';
import './Login.css'
import firebase from './firebase';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
        this.handleUpdate=this.handleUpdate.bind(this)
        this.handleSignUp=this.handleSignUp.bind(this)
    }

    handleSignUp(e){
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
                <h3>Signup</h3>
                <form onSubmit={this.handleSignUp}>
                    Username:<input type='text' name='username' placeholder='Enter Username' onChange={this.handleUpdate} value={this.state.username}/>
                    password:<input type='text' name='password' placeholder='Enter Password' onChange={this.handleUpdate} value={this.state.password}/>
                    <button>Signup</button>
                </form>
            </div>
        );
    }
}

export default SignUp;
