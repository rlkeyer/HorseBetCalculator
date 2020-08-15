import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Calculator } from './components/Calculator'

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route exact path="/" component={Calculator} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
