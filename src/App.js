import React, { Component } from 'react';
import {BrowserRouter as Router,Switch} from "react-router-dom";
import routes from './routes/index';
import RouteWithSubRoutes from './components/RouteWithSubRoutes.jsx'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route}/>)}
        </Switch>
      </Router>
    );
  }
}


export default App;
