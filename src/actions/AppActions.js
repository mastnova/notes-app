import fetch from 'isomorphic-fetch';
import { AUTHORIZE, SET_NOTES, ADD_NOTE, REMOVE_NOTE } from '../constants/AppConstants';

export function fetchNotes() {
  return dispatch => {
    fetch('/api/notes', {
      method: 'GET',
      headers: new Headers({
        'X-Auth': sessionStorage.getItem('token')
      })
    }).then(response => {
      if(response.ok) {
      response.json().then( data => {
        dispatch( setNotes(data) );
        });
      }
    });
  }
}

function setNotes(data) {
 return { type: SET_NOTES, notes: data };
}

export function addNote(note) {
  return dispatch => {
    fetch('/api/add_note', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-Auth': sessionStorage.getItem('token')
      }),
      body: JSON.stringify(note)
    }).then( response => {
      if (response.ok) {
        dispatch( addNoteToState(note) );
      }
    })
  }
}

function addNoteToState(note){
  return {type: ADD_NOTE, note}
}

export function removeNote(timestamp) {
  return dispatch => {
    fetch('/api/remove_note', {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-Auth': sessionStorage.getItem('token')
      }),
      body: JSON.stringify({timestamp})
    }).then( response => {
      if (response.ok) {
        dispatch( removeNoteFromState(timestamp) );
      }
    })
  }
}

function removeNoteFromState(timestamp){
  return {type: REMOVE_NOTE, timestamp}
}

export function authorize(user) {
  return dispatch => {
    fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user)
    }).then( response => {
      if (response.ok) {
        response.json().then( data => {
          sessionStorage.setItem('token', data.token);
          dispatch( authorization() );
        });
      }
    })
  }
}

function authorization() {
  return {type: AUTHORIZE}
}
