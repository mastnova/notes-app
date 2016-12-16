import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class NavBar extends Component {
  render() {
    var path = location.pathname;
    return (
      <div className="nav-wrapper">
        <ul className="nav nav-pills">
          <li className={path === "/" ? "active" : ""}>
            <a onClick={this.changeTab.bind(this, '/')}>Notes</a>
          </li>
          <li className={path === "/add_note" ? "active" : ""}>
            <a onClick={this.changeTab.bind(this, '/add_note')}>Add new</a>
          </li>
        </ul>
      </div>
    )
  }

  changeTab(url) {
    browserHistory.push(url);
  }
};

export default NavBar;
