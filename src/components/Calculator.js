import "./Calculator.css";
import React, { useState, useEffect } from "react";
import { NumberTiles } from './NumberTiles'
import Select from 'react-select'


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
        <div className="places">
          {items.map((item) => (
            <div className="place-container">
              <div>{placeLabelCalc(item)}</div>
              <NumberTiles entries={entries} place={item} selectedNumbers={selectedNumbers} setSelectedNumbers={setSelectedNumbers} />
            </div>
          ))}
        </div>
      )
  }

  const placeLabelCalc = (number) => {
    const singleRace = ['Exacta', 'Trifecta', 'Superfecta']
    if (isBox) {
      return 'All Places'
    } else {
      switch (number) {
        case 1:
          return singleRace.includes(selectedType) ? '1st Place' : '1st Race'
        case 2:
          return singleRace.includes(selectedType) ? '2nd Place' : '2nd Race'
        case 3:
          return singleRace.includes(selectedType) ? '3rd Place' : '3rd Race'
        case 4:
          return singleRace.includes(selectedType) ? '4th Place' : '4th Race'
        case 5:
          return singleRace.includes(selectedType) ? '5th Place' : '5th Race'
        case 6:
          return singleRace.includes(selectedType) ? '6th Place' : '6th Race'
        default:
          return null
      }
    }
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
    let multiplier = 1;
    const first = selectedNumbers[1]
    const second = selectedNumbers[2]
    const third = selectedNumbers[3]
    const fourth = selectedNumbers[4]
    const fifth = selectedNumbers[5]
    const sixth = selectedNumbers[6]
    if (selectedType === "Exacta" && isBox && first) {
      multiplier = product([first, first]).length
    } else if (selectedType === 'Exacta' && first && second) {
      console.log(intersection(first, second))
      multiplier = product([first, second]).length
    } else if (selectedType === 'Trifecta' && first && second && third) {
      multiplier = product([first, second, third]).length
    } else if (selectedType === 'Trifecta' && isBox && first) {
      multiplier = product([first, first, first]).length
    } else if (selectedType === 'Superfecta' && first && second && third && fourth) {
      multiplier = product([first, second, third, fourth]).length
    } else if (selectedType === 'Superfecta' && isBox && first) {
      multiplier = product([first, first, first, first]).length
    } else if (selectedType === 'P3' && first && second && third) {
      multiplier = product([first, second, third], true).length
    } else if (selectedType === 'P4' && first && second && third && fourth) {
      multiplier = product([first, second, third, fourth], true).length
    } else if (selectedType === 'P5' && first && second && third && fourth && fifth) {
      multiplier = product([first, second, third, fourth, fifth], true).length
    } else if (selectedType === 'P6' && first && second && third && fourth && fifth && sixth) {
      multiplier = product([first, second, third, fourth, fifth, sixth], true).length
    } else {
      multiplier = 1;
    }
    return formatter.format(selectedAmount * multiplier);
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

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

  const amountOptions = [
    { value: 0.1, label: '$0.10' },
    { value: 0.2, label: '$0.20' },
    { value: 0.5, label: '$0.50' },
    { value: 1, label: '$1' },
    { value: 2, label: '$2' },
    { value: 5, label: '$5' },
    { value: 10, label: '$10' },
    { value: 15, label: '$15' },
    { value: 20, label: '$20' },
    { value: 50, label: '$50' },
    { value: 100, label: '$100' },
  ]

  const betOptions = [
    { value: 'Exacta', label: 'Exacta' },
    { value: 'Trifecta', label: 'Trifecta' },
    { value: 'Superfecta', label: 'Superfecta' },
    { value: 'DailyDouble', label: 'Daily Double' },
    { value: 'P3', label: 'Pick 3' },
    { value: 'P4', label: 'Pick 4' },
    { value: 'P5', label: 'Pick 5' },
    { value: 'P6', label: 'Pick 6' },
  ]

  const handleAmountChange = (value) => {
    setSelectedAmount(value.value)
  }

  const handleTypeChange = (value) => {
    setSelectedType(value.value)
  }

  return (
    <>
      <div className="container">
        {/* <div> */}
          {/* <select
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
          </select> */}
          <Select options={amountOptions} className="select" placeholder="Bet Amount" onChange={handleAmountChange}/>
        {/* </div> */}
        {/* <div className="select-options">
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
        </div> */}
        <Select options={betOptions} className="select" placeholder="Bet Type" onChange={handleTypeChange}/>
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
    </>
  );
};
