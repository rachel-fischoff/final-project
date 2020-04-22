const fs = require('fs')
const mongoose = require('mongoose')
const express = require('./node_modules/express')
const bodyParser = require('./node_modules/body-parser')
const natural = require('./node_modules/natural/lib/natural');
const use = require('@tensorflow-models/universal-sentence-encoder');
const cors = require ('./node_modules/cors') 
const app = express()
const Analyzer = require('./node_modules/natural/lib/natural').SentimentAnalyzer;
const stemmer = require('./node_modules/natural/lib/natural').PorterStemmer;

const tokenizer = new natural.WordTokenizer();

// const tokenizedText = (tokenizer.tokenize(Tweet.find({text}).forEach(item => item)))
// console.log(tokenizedText)
const analyzer = new Analyzer("English", stemmer, "afinn");
// console.log(analyzer.getSentiment([]))

// Load the model.
use.load().then(model => {
    // Embed an array of sentences.
    const sentences = [
      'Hello.',
      'How are you?'
    ];
    model.embed(sentences).then(embeddings => {
      // `embeddings` is a 2D tensor consisting of the 512-dimensional embeddings for each sentence.
      // So in this example `embeddings` has the shape [2, 512].
      embeddings.print(true /* verbose */);
    });
  });

  use.loadTokenizer().then(tokenizer => {
    tokenizer.encode('Hello, how are you?'); // [341, 4125, 8, 140, 31, 19, 54]
  });