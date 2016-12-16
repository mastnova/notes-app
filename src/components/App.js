import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Link, browserHistory, Redirect } from 'react-router';

import Notes from '../containers/Notes';
import Auth from '../containers/Auth';
import AddNote from '../containers/AddNote';
import configureStore from '../configureStore';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/' component={Notes} />
          <Route path='/auth' component={Auth} />
          <Route path='/add_note' component={AddNote} />
          <Redirect from='*' to='/' />
        </Router>
      </Provider>
    )
  }
}

export default App;
