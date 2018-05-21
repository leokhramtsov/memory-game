import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

const Card = props => {
  let style = {}
  if (props.showing) {
    style.background = props.bgColor;
  }
  return (
    <div
      onClick={props.onClick}
      className="card"
      style={style}
    />
  )
};

Card.proTypes = {
  showing: PropTypes.bool.isRequired,
  bgColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Card;