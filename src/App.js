import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Calculator } from './components/Calculator'

export const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
            <Route exact path="/" component={Calculator} />
        </Switch>
      </div>
    </Router>
  );
}
