import React from 'react';

export default class FeedItem extends React.Component {
  static propTypes = {
    stockValue: React.PropTypes.shape({
      t: React.PropTypes.string.isRequired,
      e: React.PropTypes.string.isRequired,
      l: React.PropTypes.string.isRequired,
    }).isRequired,
  };
  render() {
    const stockValue = this.props.stockValue;

    return (
      <div className="item">
        <div className="item__content">
          <div className="item__content__left">
            <span className="item__content__left__title">
              {stockValue.t}
            </span>
            <hr />
            <span className="item__content__left__exchange">
              {stockValue.e}
            </span>
          </div>
          <div className="item__content__right">
            <span className="item__content__right__value">
              {stockValue.l}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
