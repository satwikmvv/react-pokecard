import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      file:null,
      image:null,
      iname:''
    }
    this.handleChangeImage=this.handleChangeImage.bind(this)
  }

   handleChangeImage(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
          this.setState({image: e.target.result});
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    console.log(event.target.files[0])
    this.setState({iname: event.target.files[0].name.slice(0,-4)})
  }

  render() {
    return (
      <div className="App">
        <input type='file' onChange={this.handleChangeImage} />
        <br />
        <br />
        <div className='cards'>
          <img src={this.state.image} alt={this.state.iname}/>
          <h1>{this.state.iname}</h1>  
        </div>
        
      </div>
    );
  }
}

export default App;
