var express = require('express');
var serveStatic = require('serve-static');
const app = express();
app.use(serveStatic(__dirname + '/dist'));
var port = process.env.PORT || 5000;
app.listen(port);
// eslint-disable-next-line no-console
console.log('server started ' + port);

app.use(function (req, res) {
    res.status(404).json({err:'error'})
})