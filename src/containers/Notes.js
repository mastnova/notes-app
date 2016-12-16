import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import NavBar from '../components/NavBar';
import NotesList from '../components/NotesList';
import { fetchNotes, removeNote } from '../actions/AppActions';

class Notes extends Component {

  componentWillMount() {
    if (!this.props.isAuthorized) {
      browserHistory.push('/auth');
    }
    if (!this.props.notes.length) {
      this.props.dispatch(fetchNotes());
    }
  }

  render() {
    let notesList;
    if (this.props.notes.length) {
      notesList = <NotesList notes={this.props.notes} removeNote={this.removeNote.bind(this)}/>;
    } else {
      notesList = <h2>Add some notes...</h2>;
    }
    return (
      <div>
        <NavBar />
        {notesList}
      </div>

    )
  }

  removeNote(timestamp) {
    this.props.dispatch(removeNote(timestamp));
  }
};

const mapStateToProps = state => {
  return {
    notes: state.notes,
    isAuthorized: state.isAuthorized
  }
};

export default connect(mapStateToProps)(Notes);
