import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      game: [
        { empty: true, draw: undefined, coordinates: { x: 0, y: 0} }, { empty: true, draw: undefined, coordinates: { x: 1, y: 0} }, { empty: true, draw: undefined, coordinates: { x: 2, y: 0} },
        { empty: true, draw: undefined, coordinates: { x: 0, y: 1} }, { empty: true, draw: undefined, coordinates: { x: 1, y: 1} }, { empty: true, draw: undefined, coordinates: { x: 2, y: 1} },
        { empty: true, draw: undefined, coordinates: { x: 0, y: 2} }, { empty: true, draw: undefined, coordinates: { x: 1, y: 2} }, { empty: true, draw: undefined, coordinates: { x: 2, y: 2} },
      ],
      turn: 1,
      winner: undefined,
    };
  }

  handleClick = (square, i) => {
    if (square.empty) {
      const newGameState = this.state.game;
      newGameState[i] = { ...newGameState[i], empty: false, draw: this.state.turn % 2 === 0 ? 'O' : 'X'}
      this.setState({ turn: this.state.turn + 1, newGameState });
      this.checkForVictory(newGameState[i]);
    }
  }

  checkForVictory(square) {
    const { game } = this.state;
    // Check for horizontal winner
    if (game.filter(sq => sq.coordinates.y === square.coordinates.y).filter(sq => sq.draw === square.draw).length === 3) {
      this.setState({ turn: 10, winner: square.draw })
    // Check for vertical winner
    } else if (game.filter(sq => sq.coordinates.x === square.coordinates.x).filter(sq => sq.draw === square.draw).length === 3) {
      this.setState({ turn: 10, winner: square.draw })
      // Check for forward diagonal winner
    } else if ((game[2].draw && game[4].draw && game[6].draw) && game[2].draw === game[4].draw && game[2].draw === game[6].draw) {
      this.setState({ turn: 10, winner: square.draw });
      // Check for backward diagonal winner
    } else if ((game[0].draw && game[4].draw && game[8].draw) && game[0].draw === game[4].draw && game[0].draw === game[8].draw) {
      this.setState({ turn: 10, winner: square.draw });
    }
  }

  handleReset = () => {
    this.setState({
      game: [
        { empty: true, draw: undefined, coordinates: { x: 0, y: 0} }, { empty: true, draw: undefined, coordinates: { x: 1, y: 0} }, { empty: true, draw: undefined, coordinates: { x: 2, y: 0} },
        { empty: true, draw: undefined, coordinates: { x: 0, y: 1} }, { empty: true, draw: undefined, coordinates: { x: 1, y: 1} }, { empty: true, draw: undefined, coordinates: { x: 2, y: 1} },
        { empty: true, draw: undefined, coordinates: { x: 0, y: 2} }, { empty: true, draw: undefined, coordinates: { x: 1, y: 2} }, { empty: true, draw: undefined, coordinates: { x: 2, y: 2} },
      ],
      turn: 1,
      winner: undefined,
    })
  }

  render() {
    return (
      <div className="App" style={{ display: 'flex', flexFlow: 'column nowrap' }}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to tic-tac-toe created with React</h1>
        </header>

        <div style={{ margin: 32 }}>
          {this.state.turn < 10 && `${this.state.turn % 2 === 0 ? 'O' : 'X'}'s turn`}
          {this.state.winner && `${this.state.winner} wins!`}
          {this.state.winner && <button style={{ width: 100, alignSelf: 'center' }} onClick={this.handleReset}>New game!</button>}
          {!this.state.winner && this.state.turn > 9 && 'DRAW!'}
          {!this.state.winner && this.state.turn > 9 && <button onClick={this.handleReset}>Play again!</button>}
        </div>

        <div style={{ width: 300, display: 'flex', flexFlow: 'row wrap', alignSelf: 'center', marginTop: 64, cursor: 'pointer' }}>
          {this.state.game.map((square, i) =>
            <div
              key={`${square.coordinates.x}${square.coordinates.y}`}
              tabIndex={i + 1}
              onClick={() => !this.state.winner && this.handleClick(square, i)}
              style={{ border: '1px solid grey', width: 98, height: 88, fontSize: 64, paddingTop: 10 }}
            >{square.draw}</div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
