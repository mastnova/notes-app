import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import NavBar from '../components/NavBar';
import { addNote } from '../actions/AppActions';

class AddNote extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      isValid: false
    }
  }

  componentWillMount() {
    if (!this.props.isAuthorized) {
      browserHistory.push('/auth');
    }
  }

  onChangeInput() {
    const title = this.refs.title.value;
    const description = this.refs.desc.value;
    if (!title || !description) {
      this.setState({isValid: false});
    } else {
      this.setState({isValid: true});
    }
    this.setState({title, description});
  }

  onClickAdd() {
    const note = {
      timestamp: new Date().getTime(),
      title: this.state.title,
      description: this.state.description
    };
    this.setState({
      title: '',
      description: ''
    });
    this.props.dispatch(addNote(note));
  }

  render() {
    return (
      <div className="add-form">
        <NavBar />
        <div className={this.state.title ? "form-group has-success" : "form-group"}>
          <label
            className="control-label"
            htmlFor="title">
              Title
          </label>
          <input
            ref="title"
            type="text"
            className="form-control"
            id="title"
            value={this.state.title}
            onChange={this.onChangeInput.bind(this)}
          />
        </div>
        <div className={this.state.description ? "form-group has-success" : "form-group"}>
          <label
            className="control-label"
            htmlFor="desc">
              Description
          </label>
          <textarea
            ref="desc"
            id="desc"
            className="form-control"
            rows="3"
            value={this.state.description}
            onChange={this.onChangeInput.bind(this)}>
          </textarea>
        </div>
        <br />
        <button
          onClick={this.onClickAdd.bind(this)}
          type="button"
          className="btn btn-success"
          disabled={this.state.isValid ? '' : 'disabled' }>
            Add note
        </button>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    isAuthorized: state.isAuthorized
  }
};

export default connect(mapStateToProps)(AddNote);
