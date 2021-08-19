/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import axios from 'axios';
import {
  Route, HashRouter, BrowserRouter, Redirect, Router,
} from 'react-router-dom';
import Form from './components/Form';
import Output from './components/Output';
import Admin from './components/Admin';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      route: '',
      agent: ''
    };
  }

  changeRoute(agent, redirect) {
    console.log(agent, ' agent ....... ', redirect, ' redirect')
    this.setState({
        redirect: redirect,
        agent: agent,
    })
  }

  render() {
    return (
      <HashRouter>
        <div>
          <div>
            <Route
              path="/"
              exact
              strict
              render={() => (
                <Form total={this.state.total} guests={this.state.guests} redirect={this.state.redirect} route={this.changeRoute.bind(this)}/>
              )}
            />
          </div>
          <div>
            <Route
              path="/Success"
              exact
              strict
              render={() => (
                <Output agent={this.state.agent} route={this.state.route} />
              )}
            />
          </div>
          <div>
            <Route
              path="/Admin"
              exact
              strict
              render={() => (
                <Admin />
              )}
            />
          </div>
        </div>
      </HashRouter>
    );
  }
}
     
export default Routes;
