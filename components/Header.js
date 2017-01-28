import React from 'react';

const logo = require('../uploads/img/logo.png');

export default class Header extends React.Component {
  render() {
    return (
      <header className="header" role="banner">
        <div className="container">
          <img className="logo" src={logo} alt="logo" />
          <h1 className="appName">STOCK TRAINING</h1>
          <nav>
            <a>More stuff to come...</a>
          </nav>
        </div>
      </header>
    );
  }
}
