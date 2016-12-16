import { combineReducers } from 'redux';
import { AUTHORIZE, SET_NOTES, ADD_NOTE, REMOVE_NOTE } from '../constants/AppConstants';

function authorization(state = false, action) {
  switch (action.type) {
    case AUTHORIZE:
      return true;
    default:
      return state;
  }
}

function notes(state = [], action) {
  switch (action.type) {
    case SET_NOTES:
      return action.notes;
    case ADD_NOTE:
      return state.concat([action.note]);
    case REMOVE_NOTE:
      return state.filter(note => note.timestamp !== action.timestamp);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  isAuthorized: authorization,
  notes: notes
});

export default rootReducer;
