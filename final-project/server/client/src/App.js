import React from 'react';
import './App.css';
import {useState, useEffect} from 'react'
import { withRouter } from "react-router-dom";
import * as actions from './actions';
import { connect } from "react-redux";
import NavBar from './components/nav_bar'
import * as use from "@tensorflow-models/universal-sentence-encoder";

// console.log(process.env.TWITTER_API_KEY)


class App extends React.Component {

// const [text, setText] = useState([]);
// const [model, setModel] = useState(null);
// const [encoder, setEncoder] = useState(null);

// useEffect(() => {
//   const loadModel = async () => {
//     const sentenceEncoder = await use.load();
//     const trainedModel = await trainModel(sentenceEncoder);
//     setEncoder(sentenceEncoder);
//     setModel(trainedModel);
//   };
//   loadModel();
// }, []);

// const handleSaveText = text => {
//   const textId = UUID.generate();
//   const textData= [{
//     id: textId,
//     text: text,
//   }
//   ];
//   setText({
//     ...text,
//     [textId]: textData
//   });
// };


render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
}
}

export default withRouter(connect(
  null,
  actions
)(App));
