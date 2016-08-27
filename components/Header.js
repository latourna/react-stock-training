import React, { Component } from "react";

export default class Header extends Component {
    render() {
        return (
            <header className="header" role="banner">
                <div className="container">
                    <img className="logo" src={require("../uploads/img/logo.png")}/>
                    <h1 className="appName">STOCK TRAINING</h1>
                    <nav>
                        <a>More stuff to come...</a>
                    </nav>
                </div>
            </header>
        );
    }
}