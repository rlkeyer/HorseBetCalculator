import './Calculator.css'
import React, { useState, useEffect } from 'react'

const HorseRow = (number) => {

    const numberTiles = () => {
        let i = 0
        while (i < number) {
            i++
            return (
                <div>
                    {i}
                </div>
            )
        }
    }

    return (
        <div>
          {numberTiles()}
        </div>
    )
}

export const Calculator = () => {
    const [selectedNumbers, setSelectedNumbers] = useState([])
    const [selectedAmount, setSelectedAmount] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [isBox, setIsBox] = useState(false)

    const numberTiles = (number) => {
        let items = []
        let i = 0
        while (i < number) {
            i++
            items.push(i)
        }
        return items
    }

    const numberSelected = (number) => {
        if (selectedNumbers.includes(number)) {
            return true
        } else {
            return false
        }
    }

    const exactaCalc = (numbers) => {
        const length = numbers.length
        if (!isBox && length === 2) {
            return selectedAmount
        } else {
            const multiplier = length * (length - 1)
            console.log('amount   -->  ', selectedAmount)
            console.log('multiplier   -->  ', multiplier)
            return (selectedAmount * multiplier)
        }
    }

    const calculateBetCost = () => {
        const length = selectedNumbers.length
        let multiplier = 1
        if (selectedType === 'Exacta' && isBox) {
            multiplier = length * (length - 1)
        } else if (selectedType === "Trifecta") {
            multiplier = length * (length - 1) * (length - 2)
        } else {
            multiplier = 1
        }
        return selectedAmount * multiplier
    }

    useEffect(() => {
        console.log(exactaCalc(selectedNumbers))
    }, [selectedNumbers])

    return (
        <div>
            <div className="container">
                <div className="select-options">
                    <select id="bet-amount" className="select" onChange={(e) => setSelectedAmount(e.target.value)}>
                        <option value disabled="disabled" selected="selected" hidden>Bet Amount</option>
                        <option value={0.10}>$0.10</option>
                        <option value={0.20}>$0.20</option>
                        <option value={0.50}>$0.50</option>
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
                    <select id="bet-type" className="select" onChange={(e) => setSelectedType(e.target.value)}>
                        <option value disabled="disabled" selected="selected" hidden>Bet Type</option>
                        <option value="Exacta">Exacta</option>
                        <option value="Trifecta">Trifecta</option>
                        <option value="Superfecta">Superfecta</option>
                        <option value="Daily Double">Daily Double</option>
                        <option value="Pick 3">Pick 3</option>
                        <option value="Pick 4">Pick 4</option>
                        <option value="Pick 5">Pick 5</option>
                        <option value="Pick 6">Pick 6</option>
                    </select>
                </div>
                    <div className="checkbox">
                        <input type="checkbox" id="box" name="box" value="box" onChange={() => setIsBox(!isBox)} />
                        <label for="box">Box</label>
                    </div>
            </div>

            <div className="number-tiles">
                {numberTiles(14).map((item) => {
                    return (
                        <div className={`square-number ${numberSelected(item) ? 'is-selected' : ''}`}
                            onClick={() => {
                                if (!numberSelected(item)) {
                                    setSelectedNumbers([...selectedNumbers, item])
                                    console.log(selectedNumbers)
                                } else {
                                    setSelectedNumbers(selectedNumbers.filter((number) => number !== item))
                                    console.log(selectedNumbers)
                                }
                            }}>
                            <p>
                                {item}
                            </p>
                        </div>
                    )
                })}
            </div>

            <div className="cost-display">
                <span>{`Bet Cost: ${calculateBetCost()}`}</span>
            </div>
        </div>
    )
}
