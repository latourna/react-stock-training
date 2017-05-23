import $ from 'jquery';
import React from 'react';
import FeedItem from './FeedItem';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockValues: [],
    };
    this.stockSymbols = 'GOOG, FB, MSFT, AAPL';
  }

  componentDidMount() {
    this.getStockAndSetTimeout();
  }

  getStockAndSetTimeout() {
    this.getStock();
    setTimeout(() => {
      this.getStockAndSetTimeout();
    }, 30000);
  }

  getStock() {
    const code = this.stockSymbols.replace(/\s/g, '');
    $.getJSON('/queryrealtimestock', { code },
      (res) => {
        if (res.status !== 'OK') {
          console.error(`ERROR ${res.status} : ${res.message}`);
          return;
        }

        this.setState({
          stockValues: res.data,
        });
      });
  }

  changeStockSymbols(stockSymbol) {
    this.stockSymbols = stockSymbol;
    this.getStock();
  }

  handleChange(e) {
    const value = e.target.value;
    this.changeStockSymbols(value);
  }

  render() {
    const stockValues = this.state.stockValues.map(stockValue => (
      <FeedItem stockValue={stockValue} key={stockValue.id} />
    ));

    return (
      <div className="feed">
        <div className="introduction">
          <div className="introduction__content">
            <div className="introduction__description">
              Enter stock symbols separated by a comma
            </div>
            <div className="introduction__search">
              <input defaultValue={this.stockSymbols} onChange={this.handleChange.bind(this)} />
            </div>
            <span className="introduction__statistics">
              {stockValues.length} stocks found.
            </span>
          </div>
        </div>
        <div className="feed">
          {stockValues}
        </div>
      </div>
    );
  }
}
