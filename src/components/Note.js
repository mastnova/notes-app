import React, { Component, PropTypes } from 'react';

class Note extends Component {
  render() {
    const note = this.props.data;
    const lifetime = this.lifetime(note.timestamp);
    const date = this.formatDate(note.timestamp);
    return (
      <tr>
        <td>{lifetime}</td>
        <td className="td-title">{note.title}</td>
        <td className="td-desc">{note.description}</td>
        <td>{date}</td>
        <td>
          <button
            className="btn btn-danger btn-xs"
            onClick={this.props.onClickRemove.bind(this, note.timestamp)}>
              X
          </button>
        </td>
      </tr>
    )
  }

  formatDate(timestamp) {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().substr(2,2);
    return `${day}.${month}.${year}`;
  }

  lifetime(timestamp) {
    const currentTimestamp = new Date().getTime();
    const lifetime = (currentTimestamp - timestamp) / 1000;

    const dimension = {
      years: Math.floor(lifetime / 31557600),
      months: Math.floor(lifetime / 2592000),
      weeks: Math.floor(lifetime / 604800),
      days: Math.floor(lifetime / 86400),
      hours: Math.floor(lifetime / 3600),
      mins: Math.floor(lifetime / 60),
      secs: Math.floor(lifetime)
    };

    for (var prop in dimension) {
      if (dimension.hasOwnProperty(prop)) {
        if (dimension[prop] > 1) {
          return `${dimension[prop]} ${prop}`;
        }
        if (dimension[prop] === 1) {
          return `1 ${prop.substr(0, prop.length - 1)}`;
        }
      }
    }

    return 'just created';
  }
};

Note.propTypes = {
  data: PropTypes.object.isRequired,
  onClickRemove: PropTypes.func.isRequired
};

export default Note;
