"use strict";
/* globals __dirname, require, console */

const express = require('express');
const app = express();
// const router = express.Router();
const http = require('http').Server(app);
const url = require('url');
const io = require('socket.io')(http);

http.listen(3030, () => console.log('listening on 10.0.0.236:3030') );

app.get('/', serveIndex);
app.get('/index.html', serveIndex);

function serveIndex(req, res) {
    res.sendFile(`${__dirname}/index.html`);
}

app.get('/dist/:file', (req, res) => {
    res.sendFile(`${__dirname}/dist/${req.params.file}`);
});