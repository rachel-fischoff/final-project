import {combineReducers} from 'redux'
import searchBarReducer from './reducer_search'


const rootReducer = combineReducers({
  search: searchBarReducer
});

export default rootReducer;