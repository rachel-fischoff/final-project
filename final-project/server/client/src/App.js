import React from 'react';
import './App.css';
import SearchBar from "./components/search_bar";
import SearchResultsGrid from './components/search_results_grid';
import CssBaseline from '@material-ui/core/CssBaseline';


function App() {

  return (
    <React.Fragment>
    <CssBaseline />
  
    <div className="App text-center">
    <h1>Final Project</h1>
     <br/>
     <SearchBar/>
     <SearchResultsGrid/>
     </div>
     </React.Fragment>

  );
}

export default App;
