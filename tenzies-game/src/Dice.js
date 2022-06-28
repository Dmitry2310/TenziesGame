import React from 'react';
import './App.css';

const Dice = (props) => {

  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }
  
  return (
    <div className='diceWrapper' style={styles} onClick={() => props.holdFunction(props.id)}>
      <h2 className='diceNum'>{props.value}</h2>
    </div>
  );
}

export default Dice;
