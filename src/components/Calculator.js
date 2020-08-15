import "./Calculator.css";
import React, { useState, useEffect } from "react";
import { NumberTiles } from './NumberTiles'


// const HorseRow = (number) => {
//   const numberTiles = () => {
//     let i = 0;
//     while (i < number) {
//       i++;
//       return <div>{i}</div>;
//     }
//   };

//   return <div>{numberTiles()}</div>;
// };

export const Calculator = () => {
  const [selectedNumbers, setSelectedNumbers] = useState({});
  const [selectedAmount, setSelectedAmount] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [entries, setEntries] = useState(12);
  const [isBox, setIsBox] = useState(false);

  const numberOfPlaces = (entries) => {
    const betTypes = {
      Exacta: 2,
      Trifecta: 3,
      Superfecta: 4,
      DailyDouble: 2,
      P3: 3,
      P4: 4,
      P5: 5,
      P6: 6,
    }

    const places = isBox ? 1 : betTypes[selectedType]

    let items = [];
    let i = 0;
    while (i < places) {
      i++;
      items.push(i);
    }

      return (
        <>
          {items.map((item) => (
            <NumberTiles entries={entries} place={item} selectedNumbers={selectedNumbers} setSelectedNumbers={setSelectedNumbers} />
          ))}
        </>
      )
  }

  const exactaCalc = (numbers) => {
    const length = numbers.length;
    if (!isBox && length === 2) {
      return selectedAmount;
    } else {
      const multiplier = length * (length - 1);
      console.log("amount   -->  ", selectedAmount);
      console.log("multiplier   -->  ", multiplier);
      return selectedAmount * multiplier;
    }
  };

  const calculateBetCost = () => {
    let length = 1;
    let multiplier = 1;
    const first = selectedNumbers[1]
    const second = selectedNumbers[2]
    const third = selectedNumbers[3]
    const fourth = selectedNumbers[4]
    if (isBox) length = first?.length || 0
    if (selectedType === "Exacta" && isBox) {
      multiplier = length * (length - 1);
    } else if (selectedType === "Trifecta" && isBox) {
      multiplier = length * (length - 1) * (length - 2);
    }
      else if (selectedType === 'Exacta' && first && second) {
        console.log(intersection(first, second))
        multiplier = product([first, second]).length
      } else if (selectedType === 'Trifecta' && first && second && third) {
        multiplier = product([first, second, third]).length
      } else if (selectedType === 'Superfecta' && first && second && third && fourth) {
        multiplier = product([first, second, third, fourth]).length
        console.log(multiplier)
      } else if (selectedType === 'Superfecta' && isBox && first) {
        multiplier = product([first, first, first, first]).length
      } else {
      multiplier = 1;
    }
    return selectedAmount * multiplier;
  };

function product(array, repeat) {
  return array.reduce(function tl (accumulator, value) {
    var tmp = [];
    accumulator.forEach(function (a0) {
      value.forEach(function (a1) {
        if (repeat === true) {
          tmp.push(a0.concat(a1));
        } else {
          if (!a0.includes(a1)) tmp.push(a0.concat(a1));
        }
      });
    });
    return tmp;
  }, [[]]);
}

  const intersection = (first, second, third, fourth) => {
    if (!first || !second) return
    if (!third && !fourth) {
      return first.filter(horse => second.includes(horse)).length
    } else if (!fourth) {
      console.log(first.filter(horse => second.includes(horse)).filter(horse => third.includes(horse)))
      return first.filter(horse => second.includes(horse)).filter(horse => third.includes(horse)).length
    } else {
      console.log('not ready')
    }
  }

  // Trifecta combinations = (A x B x C) – (AB x C) – (AC x B) – (BC x A) + (2 x ABC)

  return (
    <div>
      <div className="container">
        <div className="select-options">
          <select
            id="bet-amount"
            className="select"
            onChange={(e) => setSelectedAmount(e.target.value)}
          >
            <option value disabled="disabled" selected="selected" hidden>
              Bet Amount
            </option>
            <option value={0.1}>$0.10</option>
            <option value={0.2}>$0.20</option>
            <option value={0.5}>$0.50</option>
            <option value={1}>$1</option>
            <option value={2}>$2</option>
            <option value={5}>$5</option>
            <option value={10}>$10</option>
            <option value={15}>$15</option>
            <option value={20}>$20</option>
            <option value={50}>$50</option>
            <option value={100}>$100</option>
          </select>
        </div>
        <div className="select-options">
          <select
            id="bet-type"
            className="select"
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value disabled="disabled" selected="selected" hidden>
              Bet Type
            </option>
            <option value="Exacta">Exacta</option>
            <option value="Trifecta">Trifecta</option>
            <option value="Superfecta">Superfecta</option>
            <option value="DailyDouble">Daily Double</option>
            <option value="P3">Pick 3</option>
            <option value="P4">Pick 4</option>
            <option value="P5">Pick 5</option>
            <option value="P6">Pick 6</option>
          </select>
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            id="box"
            name="box"
            value="box"
            onChange={() => setIsBox(!isBox)}
          />
          <label for="box">Box</label>
        </div>
      </div>

      {numberOfPlaces(12)}

      <div className="cost-display">
        <span>{`Bet Cost: ${calculateBetCost()}`}</span>
      </div>
    </div>
  );
};
