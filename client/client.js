import React from "react";
import { render } from "react-dom";
import Layout from "../components/Layout";

require("./main.less");
require('../uploads/img/favicon.ico');

render(
    <Layout/>, document.getElementById("container")
);