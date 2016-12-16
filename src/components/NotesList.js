import React, { Component, PropTypes } from 'react';
import Note from './Note';

class NotesList extends Component {
  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>lifetime</th>
            <th>title</th>
            <th>description</th>
            <th>date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.notes.map((note, index) => {
              return <Note data={note} key={index} onClickRemove={this.props.removeNote}/>
            })
          }
        </tbody>
      </table>
    )
  }
};

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
  removeNote: PropTypes.func.isRequired
};

export default NotesList;
