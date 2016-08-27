import React, { Component } from "react";
import FeedItem from "../components/FeedItem";
import $ from "jquery";

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockValues: []
        };

        this.stockSymbols = "GOOG, FB, MSFT, AAPL";
    }//lol

    changeStockSymbols(stockSymbol) {
        this.stockSymbols = stockSymbol;
        this.getStock();
    }

    getStockAndSetTimeout() {
        this.getStock();
        setTimeout(() => {
            this.getStockAndSetTimeout();
        }, 30000);
    }

    getStock() {
        $.getJSON("/queryrealtimestock", {"code": this.stockSymbols.replace(/\s/g, '')},
            (res) => {
                if (res.status !== "OK") {
                    console.error(`ERROR ${res.status} : ${res.message}`);
                    return;
                }

                this.setState({
                    stockValues: res.data
                });

                console.log(this.state.stockValues);
            });
    }

    componentDidMount() {
        this.getStockAndSetTimeout();
    }

    handleChange(e) {
        const value = e.target.value;
        this.changeStockSymbols(value)
    }

    render() {
        let stockValues = this.state.stockValues.map((stockValue) => {
            return (
                <FeedItem stockValue={stockValue} key={stockValue.id}/>
            );
        });

        return (
            <div className="feed">
                <div className="introduction">
                    <div className="introduction__content">
                        <div className="introduction__description">
                            Enter stock symbols separated by a comma
                        </div>
                        <div className="introduction__search">
                            <input defaultValue={this.stockSymbols} onChange={this.handleChange.bind(this)}/>
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