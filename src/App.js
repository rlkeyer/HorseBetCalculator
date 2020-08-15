import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import { Calculator } from './components/Calculator'

function App() {
  return (
        <div className="App">
       {/* <Switch> */}
          {/* <Route exact path="/" component={Calculator} /> */}
       {/* </Switch> */}
          <Calculator/>
        </div>
  );
}

export default App;
