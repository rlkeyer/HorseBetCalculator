import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import { Calculator } from './components/Calculator'

function App() {
  return (
        <div className="HELLO">
       {/* <Switch> */}
          <Route exact path="/" component={Calculator} />
       {/* </Switch> */}
        </div>
  );
}

export default App;
