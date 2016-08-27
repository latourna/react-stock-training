import React, { Component } from "react";
import Header from "../components/Header";
import Feed from "../components/Feed";

export default class Layout extends Component {
    render() {
        return (
            <div className="layout">
                <Header/>
                <Feed/>
            </div>
        );
    }
}