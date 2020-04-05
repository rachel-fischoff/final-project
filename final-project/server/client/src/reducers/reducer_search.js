import {FETCH_TWEETS} from "../actions/index";

const INITIAL_STATE = {
    term:'',
    statuses: []
}
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_TWEETS :
        return Object.assign({}, state, {
          term: action.payload
          })
      default:
        return state;
    }
  }