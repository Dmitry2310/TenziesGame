import React, { useEffect, useState } from 'react';
import './App.css';
import Dice from './Dice';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import {useWindowSize} from 'react-use';

const App = () => {

  const { width, height } = useWindowSize()
  const createNewDice = () => {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),    // if are not expecting 0 use {ceil}
      isHeld: false
    }
  }

  const createNewDices = () => {
    let newDiceArray = [];
    for (let i = 0; i < 10; i++) {
      newDiceArray.push(createNewDice())
    }
    return newDiceArray;
  }

  const [dices, setDices] = useState(createNewDices());
  const [tenzies, setTenzies] = useState(false);

  const rollDice = () => {
    if (!tenzies) {
      setDices(oldDice => oldDice.map(dice => {
        return dice.isHeld ?
          dice :
          createNewDice()
      }))
    } else {
      setTenzies(false);
      setDices(createNewDices())
    }
  }

  const holdFunction = (id) => {
    setDices(prevDices => prevDices.map(dice => {
      return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
    }))
  }
  useEffect(() => {
    const allHeld = dices.every(dice => dice.isHeld)    // return boolean
    const firstValue = dices[0].value
    const allValues = dices.every(dice => dice.value === firstValue)
    if (allHeld && allValues) {
      setTenzies(true)
    }
    /* const arr = dices.filter(dice => dice.isHeld !== true)
    const arr2 = dices.filter(dice => dice.value !== dices[0].value)
    if (arr.length === 0 && arr2.length === 0) {
      console.log('won')
    } */
  }, [dices])

  const diceElements = dices.map(dice => <Dice key={dice.id} value={dice.value}
    isHeld={dice.isHeld} holdFunction={holdFunction} id={dice.id} />)

  return (
    <main>
      {tenzies && <Confetti width={width}
        height={height} />}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='diceContainer'>
        {diceElements}
      </div>
      < button onClick={rollDice} className='rollDiceButton'>{tenzies ? "New Game" : "Roll"} </button>
    </main>
  );
}

export default App;
