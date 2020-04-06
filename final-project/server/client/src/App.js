import React from 'react';
import './App.css';
import NavBar from './components/nav_bar'
import SearchBar from "./components/search_bar";
import SearchResultsGrid from './components/search_results_grid';
import SearchResultsPaper from './components/search_results_as_paper'
import CssBaseline from '@material-ui/core/CssBaseline';


function App() {

  return (
    <React.Fragment>
    <CssBaseline />
  
    <div className="App text-center">
      <NavBar/>
     <br/>
     <br/>
     <SearchResultsPaper/>
     </div>
     </React.Fragment>

  );
}

export default App;
