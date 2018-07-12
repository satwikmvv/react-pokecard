import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import DisplayCards from './components/DisplayCards'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      trainer: '',
      pokemon: '',
      imageURL:'',
      UID: '',
      file: null,
      items:[]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeItem=this.removeItem.bind(this);
    this.logOut=this.logOut.bind(this);
    this.changePicture=this.changePicture.bind(this)
  }

  
  
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref(`items/${this.state.UID}`);
    const item = {
      trainer: this.state.trainer,
      pokemon: this.state.pokemon,
      imageURL: this.state.imageURL
    }
    console.log(e);
    itemsRef.push(item);
    this.setState({
      trainer: '',
      pokemon: '',
      imageURL: ''
    });
    document.getElementById("file-upload").value=null
  }


  handleChange= (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${this.state.UID}/${itemId}`);
    itemRef.remove();
  }

  changePicture(e) {
    var file= e.target.files[0];
    const storageRef= firebase.storage().ref(`images/${this.state.UID}/${file.lastModified}`);
    console.log(file);
    var refthis=this
    storageRef.put(file).then(function(snapshot) {
      let rand= snapshot;
      console.log(rand,'Uploaded a blob or file!');
      const storagereference=firebase.storage().ref(`images`)
      storagereference.child(`/${refthis.state.UID}/${file.lastModified}`).getDownloadURL().then((url)=>{
        console.log(url)
        refthis.setState({
          imageURL:url
        })
      })
    })
    
  }

  componentDidMount() {
    if(this.props.location.state != null) {
      this.setState({
        UID: this.props.location.state.uid
      })
    }
    else{
      this.props.history.push({
        pathname:'/Login'
      })
      
    }
    
    const itemsRef = firebase.database().ref(`items/${this.state.UID}`);
    itemsRef.on('value', (snapshot) => {
      let uid = this.state.UID
      let items=null;
      if (snapshot.val()){
        items = snapshot.val()[uid];
      }
      
      // console.log(items[uid])
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          trainer: items[item].trainer,
          pokemon: items[item].pokemon,
          imageURL: items[item].imageURL
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  logOut(e) {
      const test= this;
      e.preventDefault();
    firebase.auth().signOut().then(function() {
      console.log(test,'Signed OUT!')
      test.props.history.push({
        pathname: '/',
    })
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      console.log(error)
    });
  }

  render() {
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Pokecard</h1>
              <button onClick={this.logOut}>Log out</button>
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="trainer" placeholder="trainer name?" onChange={this.handleChange} value={this.state.trainer}/>
                <input type="text" name="pokemon" placeholder="Pokemon?" onChange={this.handleChange} value={this.state.pokemon}/>
                <input type="file" id="file-upload" onChange= {this.changePicture}/>
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
