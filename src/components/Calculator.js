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
  const [entries, setEntries] = useState(null);
  const [isBox, setIsBox] = useState(false);

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

  const numberOfPlaces = (entries) => {
    const places = isBox ? 1 : betTypes[selectedType]

    let items = [];
    let i = 0;
    while (i < places) {
      i++;
      items.push(i);
    }

      if (entries) return (
        <div className="places">
          {items.map((item) => (
            <div className="place-container">
              <div style={{width: '5rem'}}>{placeLabelCalc(item)}</div>
              <NumberTiles entries={entries} place={item} selectedNumbers={selectedNumbers} setSelectedNumbers={setSelectedNumbers} />
            </div>
          ))}
        </div>
      )
  }

  const singleRace = ['Exacta', 'Trifecta', 'Superfecta']

  const placeLabelCalc = (number) => {
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

  const horseNumber = [
    { value: 10, label: '10' },
    { value: 12, label: '12' },
    { value: 14, label: '14' },
    { value: 16, label: '16' },
    { value: 18, label: '18' },
    { value: 20, label: '20' },
  ]

  const handleAmountChange = (value) => {
    setSelectedAmount(value.value)
  }

  const handleTypeChange = (value) => {
    setSelectedType(value.value)
  }

  const handleHorsesChange = (value) => {
    setEntries(value.value)
  }

  const displaySelectedHorses = () => {
    const number = betTypes[selectedType]
    const arr = []
    let count = 1
    while (count < number + 1) {
      if (selectedNumbers[`${count}`]) arr.push(<div className="selections">{selectedNumbers[`${count}`].join(', ')}</div>)
      else arr.push(<div className="selections">-</div>)
      count++
    }
    console.log(arr)
    return arr
    // const numbers = []
    // let count = 1
    // while (count < 7) {
    //   if (selectedNumbers[`${count}`]) {
    //     numbers.push(selectedNumbers[`${count}`])
    //   } else {
    //     numbers.push([])
    //   }
    //   count++
    // }

    // console.log(numbers)
    // return numbers.map((place) => place.join(', ')).join(' / ')
  }

  return (
    <div className="Calculator">
      <div className="container">
        <div className="dropdowns">
          <Select options={amountOptions} className="select" placeholder="Bet Amount" onChange={handleAmountChange}/>
          <Select options={betOptions} className="select" placeholder="Bet Type" onChange={handleTypeChange}/>
          <Select options={horseNumber} className="select" placeholder="# of Horses" onChange={handleHorsesChange} />
        </div>
        {(singleRace.includes(selectedType)) && (
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
        )}
      </div>

      {numberOfPlaces(entries)}

      <div className="selected-horses">
        {!isBox ? displaySelectedHorses().map((place, index) => {
          return index + 1 === betTypes[selectedType] ? (
            place
          ) : (
            <>
            {place}
            <div>{' / '}</div>
            </>
          )
        }) : (
            <>
          {displaySelectedHorses()[0]}
          </>
        )}
      </div>
      <div className="cost-display">
        <span>{`Bet Cost: ${calculateBetCost()}`}</span>
      </div>
    </div>
  );
};
