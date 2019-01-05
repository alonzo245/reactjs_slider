const express = require('express');
const path = require('path');

const app = express();

app.get('/build', (req, res) => {
    console.log('sss');
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.get('/', (req, res) => {
    app.use(express.static(path.join(__dirname, '/')));
    res.sendFile(path.join(__dirname + '/Sofas_n_Couches.html'));
});

app.use(express.static(path.join(__dirname, '/build')));

const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);