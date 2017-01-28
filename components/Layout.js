import React from 'react';
import Header from './Header';
import Feed from './Feed';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="layout">
        <Header />
        <Feed />
      </div>
    );
  }
}
