import React, { Component } from 'react';
import {HashRouter,BrowserRouter, Route, Switch} from 'react-router-dom';

import IndexPage from '../cmp/index';
export default class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={IndexPage}/>
          <Route path='/index' component={IndexPage}/>
          
          
          
        </Switch>
      </BrowserRouter>
    );
  }
}