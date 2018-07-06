import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import DisplayCards from './components/DisplayCards'

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      imageid:'',
      items:[]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeItem=this.removeItem.bind(this)
  }

  
  
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.username
    }
    console.log(e);
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
    var file= e.target.files[0];
    const storageRef= firebase.storage().ref(`images/${file.lastModified}`);
    console.log(file);
    storageRef.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    })
    
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('items');
    
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
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
            <DisplayCards cards={this.state.items} removeItems={this.removeItem} />
          </section>
        </div>
      </div>
    );
  }
}
export default App;
