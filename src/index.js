import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  constructor() {
    super();
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square"></button>
    );
  }
}

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(100).fill(null),
    };
  } 

  renderSquare(i) {
    return <Square key = {i} value={this.state.squares[i]} />;    
  }

  render() {
    var keyArrayLength = 10; 
    var keyArray = [...Array(keyArrayLength).keys()];

    return (
      <div>
        {
          keyArray.map ( (n) => {
            return <div key = {n} className="board-row">
              {
                keyArray.map ( (n) => {
                  return this.renderSquare(n)
                })
              }
            </div>
          })
        }
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);