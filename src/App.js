import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items:[]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.username
    }
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      username: ''
    });
  }


  handleChange= (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  changePicture(e) {
    console.log(e.target.files[0]);
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('items');
    const storageRef= firebase.storage().ref('images');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      console.log(snapshot.val());
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  render() {
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Pokecard</h1>
              
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" placeholder="trainer name?" onChange={this.handleChange} value={this.state.username}/>
                <input type="text" name="currentItem" placeholder="Pokemon?" onChange={this.handleChange} value={this.state.currentItem}/>
                <input type="file" onChange= {this.changePicture}/>
                <button>Add Card</button>
              </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
                {this.state.items.map((item) => {
                  return (
                    <li key={item.id}>
                      <h3>{item.title}</h3>
                      <p>trained by: {item.user}</p>
                      <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                    </li>
                    )
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;
