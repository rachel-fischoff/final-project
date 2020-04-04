import React from 'react';
import './App.css';
import SearchBar from "./components/search_bar";
import SearchResults from './components/search_results';
import NGram from './components/n_gram'
import CssBaseline from '@material-ui/core/CssBaseline';


function App() {

  return (
    <React.Fragment>
    <CssBaseline />
    <div className="App text-center">
     <br/>
     <SearchBar/>
     <SearchResults/>
     <NGram/>
     </div>
     </React.Fragment>

  );
}

export default App;
