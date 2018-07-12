import React, { Component } from 'react';
import '../styles/DisplayCards.css'

class DisplayCards extends Component {
    
    render() {
        return (
            <div className='cards'>
              <ul>
                {this.props.cards.map((item) => {
                  return (
                    <li key={item.id}>
                      <h3>{item.trainer}</h3>
                      <p>trains: {item.pokemon}</p>
                      <img src={item.imageURL} alt=""/>
                      <button onClick={() => this.props.removeItems(item.id)}>Remove Item</button>
                    </li>
                    )
                })}
              </ul>
            </div>
        );
    }
}

export default DisplayCards;