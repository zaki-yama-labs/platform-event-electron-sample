import React from 'react';
import { Switch, Route } from 'react-router';

import Root from './containers/Root';

export default (
  <Switch>
    <Route exact path="/" component={Root} />
  </Switch>
);
