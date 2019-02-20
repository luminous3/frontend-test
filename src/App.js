import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from 'components/Header';
import List from 'routes/List';
import Detail from 'routes/Detail';
import { withContextState, connectState } from 'decorators/contextState';
import 'reset-css';
import './base.css';


@withContextState({
  businesses: [],
  current: {},
  params: {
    location: 'Las Vegas',
    limit: 50
  }
})
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={List}  />
          <Route path="/:businessId" component={Detail} />
        </div>
      </Router>
    )
  }
}

export default App;
