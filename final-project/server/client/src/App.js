import React from 'react';
import './App.css';
import { withRouter } from "react-router-dom";
import * as actions from './actions';
import { connect } from "react-redux";
import NavBar from './components/nav_bar'

// console.log(process.env.TWITTER_API_KEY)

class App extends React.Component {


  render() {
    return (
      <div>
        <NavBar/>
        {this.props.children}
      </div>
    )
  }
}

export default withRouter(connect(
  null,
  actions
)(App));
