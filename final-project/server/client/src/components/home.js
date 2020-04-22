import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import NavBar from './nav_bar'

class Home extends Component { 

    render(){
        return (
            <div> 
               <NavBar/>
             <h6> HOME PAGE </h6>
            </div>
        )
    }
    
 }
 
 function mapStateToProps(state) {
   return ({
     homePage: state.home
   })
 
 }
 
 export default connect(
   mapStateToProps,
   actions
 )(Home);
 