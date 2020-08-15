import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import { Calculator } from './components/Calculator'

function App() {
  return (
    <Switch>
      <div className="App">
        <Route exact path="/" component={Calculator} />
      </div>
    </Switch>
  );
}

export default App;
