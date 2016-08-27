const express = require("express");
const path = require("path");
const https = require('https');
const config = require("../webpack.config.js");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static("./dist"));

app.use("/querystock", function (req, res) {
    /*
     const url = 'http://query.yahooapis.com/v1/public/yql';
     const startDate = '2012-01-01';
     const endDate = '2012-01-08';
     const data = encodeURIComponent(`select * from yahoo.finance.historicaldata where symbol in ("${req.query.name}") and startDate = "${startDate}" and endDate = "${endDate}"`);
     const finalUrl = `${url}?q=${data}&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`;
     */

    const apiKey = "";

    https.get({
        host: "www.quandl.com",
        path: `/api/v3/datasets/WIKI/${req.query.code}.json?api_key=${apiKey}`
    }, function (response) {
        let body = "";

        response.on("data", function (chunk) {
            body += chunk;
        });

        response.on("end", function () {
            res.send({
                status: "OK",
                data: JSON.parse(body) != null ? JSON.parse(body) : []
            });
        });
    }).on("error", function (e) {
        res.send({
            status: "QUERY_ERROR",
            message: e.message
        });
    });
});

app.use("/queryrealtimestock", function (req, res) {

    https.get({host: "www.google.com", path: `/finance/info?q=${req.query.code}`}, function (response) {
        let body = "";

        response.on("data", function (chunk) {
            body += chunk;
        });

        response.on("end", function () {
            let data = [];
            try {
                body = body.substring(3);
                data = JSON.parse(body);
            } catch (e) {
            }
            res.send({
                status: "OK",
                data: data
            });
        });
    }).on("error", function (e) {
        res.send({
            status: "QUERY_ERROR",
            message: e.message
        });
    });
});

app.use("/", function (req, res) {
    res.sendFile(path.resolve("client/index.html"));
});

const port = 3000;

app.listen(port, function (error) {
    if (error) {
        throw error;
    }

    console.log("Express server listening on port", port);
});
