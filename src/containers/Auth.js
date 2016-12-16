import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { authorize } from '../actions/AppActions';

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      login: 'user1',
      password: '12345',
      loginIsValid: true,
      passwordIsValid: true
    }
  }

  componentDidUpdate() {
    if (this.props.isAuthorized) {
      browserHistory.push('/');
    }
  }

  onChangeLogin(e) {
    const login = e.target.value;
    this.setState({
      login,
      loginIsValid: login ? true : false
    });
  }

  onChangePassword(e) {
    const password = e.target.value;
    this.setState({
      password,
      passwordIsValid: password ? true : false
    });
  }

  onClickSignin() {
    if (this.state.loginIsValid && this.state.passwordIsValid) {
      const user = {
        login: this.state.login,
        password: this.state.password
      };
      this.props.dispatch(authorize(user));
    }
  }

  render() {
    return (
      <div className="auth-form">
        <div className={this.state.loginIsValid ? "form-group has-success" : "form-group has-error"}>
          <label
            className="control-label"
            htmlFor="login">
              Login
          </label>
          <input
            type="text"
            className="form-control"
            id="login"
            value={this.state.login}
            onChange={this.onChangeLogin.bind(this)}/>
        </div>
        <div className={this.state.passwordIsValid ? "form-group has-success" : "form-group has-error"}>
          <label
            className="control-label"
            htmlFor="password">
              Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={this.state.password}
            onChange={this.onChangePassword.bind(this)}/>
        </div>
        <br />
        <button
          onClick={this.onClickSignin.bind(this)}
          type="button"
          className="btn btn-success">
            Sign In
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

export default connect(mapStateToProps)(Auth);
