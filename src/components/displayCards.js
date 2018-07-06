import React, { Component } from 'react';

class DisplayCards extends Component {

    componentDidUpdate(){
        // console.log(this.props)
    }
    render() {
        return (
            <div className='wrapper'>
              <ul>
                {this.props.cards.map((item) => {
                  return (
                    <li key={item.id}>
                      <h3>{item.title}</h3>
                      <p>trained by: {item.user}</p>
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