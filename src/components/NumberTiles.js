import React, { useState, useEffect } from "react";

export const NumberTiles = (props) => {
    const { entries, place, selectedNumbers, setSelectedNumbers } = props

    let items = [];
    let i = 0;
    console.log(entries)
    console.log(place)
    while (i < entries) {
      i++;
      items.push(i);
      console.log(i)
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
                  <p>{item}</p>
                </div>
              );
            })}
          </div>
    )
}