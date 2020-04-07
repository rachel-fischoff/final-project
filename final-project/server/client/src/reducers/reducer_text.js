const INITIAL_STATE = {

    inputText: []

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'UPDATE_INPUT' :
        return (state, { inputText: {$set: action.data}});
      default:
        return state;
    }
  }


