import React from 'react';
import { Router, Route, Switch } from 'dva/router';
//import IndexPage from './routes/IndexPage';
import Users from './routes/Users';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/users" exact component={Users} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
