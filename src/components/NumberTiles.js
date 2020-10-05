import React, { useState, useEffect } from "react";

export const NumberTiles = (props) => {
    const { entries, place, selectedNumbers, setSelectedNumbers } = props

    const silksColors = {
      1: {background: '#ff0000', number: '#ffffff'},
      2: {background: '#ffffff', number: '#000000'},
      3: {background: '#0000ff', number: '#ffffff'},
      4: {background: '#ffff00', number: '#000000'},
      5: {background: '#008000', number: '#ffffff'},
      6: {background: '#000000', number: '#ffd700'},
      7: {background: '#ffa500', number: '#000000'},
      8: {background: '#ffc0cb', number: '#000000'},
      9: {background: '#40e0d0', number: '#000000'},
      10: {background: '#800080', number: '#ffffff'},
      11: {background: '#808080', number: '#ff0000'},
      12: {background: '#00ff00', number: '#000000'},
      13: {background: '#8b4513', number: '#ffffff'},
      14: {background: '#800000', number: '#ffff00'},
      15: {background: '#f0e68c', number: '#000000'},
      16: {background: '#ADD8E6', number: '#ff0000'},
      17: {background: '#000080', number: '#ffffff'},
      18: {background: '#228B22', number: '#ffff00'},
      19: {background: '#191970', number: '#ff0000'},
      20: {background: '#ff00ff', number: '#ffff00'},
    }

    let items = [];
    let i = 0;
    console.log(entries)
    console.log(place)
    while (i < entries) {
      i++;
      items.push(i);
    }

    const numberSelected = (number, place) => {
        if (selectedNumbers && selectedNumbers[place] && selectedNumbers[place].includes(number)) {
          return true;
        } else {
          return false;
        }
      };

    return (
        <div className="number-tiles">
            {items.map((item) => {
              return (
                <div
                  className={`square-number ${
                    numberSelected(item, place) ? "is-selected" : ""
                  }`}
                  onClick={() => {
                    if (!numberSelected(item, place)) {
                      setSelectedNumbers({
                          ...selectedNumbers,
                          [place]: [...(selectedNumbers[place] || []), item]
                    });
                    } else {
                      setSelectedNumbers({
                          ...selectedNumbers,
                          [place]: selectedNumbers[place].filter((number) => number !== item)
                      });
                    }
                  }}
                >
                  <div className="silks" style={{borderTop: `${!numberSelected(item, place) ? '1rem' : '5rem'} solid ${silksColors[item].background}`}}></div>
                  <p style={{color: `${!numberSelected(item, place) ? 'black' : silksColors[item].number}`}}>{item}</p>
                </div>
              );
            })}
          </div>
    )
}