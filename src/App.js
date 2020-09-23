import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Calculator } from "./components/Calculator";

function App() {
  return (
    <div className="App">
      <div className="layer">
        <Calculator />
      </div>
    </div>
  );
}

export default App;
