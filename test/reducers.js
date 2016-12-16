import expect from 'expect';
import reducer from '../src/reducers';
import * as constants from '../src/constants/AppConstants';

describe('reducers', () => {
  const defaultState = {
    isAuthorized: false,
    notes: []
  };

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('should handle AUTHORIZE', () => {
    expect(reducer(defaultState, {
      type: constants.AUTHORIZE
    })).toEqual( Object.assign({}, defaultState, {isAuthorized: true}) );
  });

  it('should handle SET_NOTES', () => {
    const notes = [
      {timestamp: 12345, title: 'header', description: 'note body'},
      {timestamp: 45678, title: 'new', description: 'another one'},
    ];
    expect(reducer(defaultState, {
      type: constants.SET_NOTES,
      notes: notes
    })).toEqual( Object.assign({}, defaultState, {notes: notes}) );
  });

  it('should handle ADD_NOTE', () => {
    const defaultState = {
      isAuthorized: true,
      notes: [
        {timestamp: 12345, title: 'header', description: 'note body'},
        {timestamp: 45678, title: 'new', description: 'another one'}
      ]
    };
    const newNote = {
      timestamp: 148468,
      title: 'main header',
      description: 'text block'
    };
    expect(reducer(defaultState, {
      type: constants.ADD_NOTE,
      note: newNote
    })).toEqual( Object.assign({}, defaultState, {notes: defaultState.notes.concat([newNote])}) );
  });

  it('should handle REMOVE_NOTE', () => {
    const initialState = {
      isAuthorized: true,
      notes: [
        {timestamp: 12345, title: 'header', description: 'note body'},
        {timestamp: 45678, title: 'new', description: 'another one'}
      ]
    };

    const finalState = {
      isAuthorized: true,
      notes: [
        {timestamp: 45678, title: 'new', description: 'another one'}
      ]
    };

    expect(reducer(initialState, {
      type: constants.REMOVE_NOTE,
      timestamp: 12345
    })).toEqual(finalState);
  });

});
