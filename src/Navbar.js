import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

const Navbar = (props) => {
  let {onNewGame, numTurns, numMatches} = props;
  
  return (
    <header>
      <div className="logo">
        <h2>Memory Game</h2>
      </div>
      <nav>
        <span>Number of Turns: {numTurns}</span>
        <span>Matched Pairs: {numMatches}</span>
        <a onClick={onNewGame}>New Game</a>
      </nav>
    </header>
  )
}

Navbar.proTypes = {
  onNewGame: PropTypes.func.isRequired
}

export default Navbar;