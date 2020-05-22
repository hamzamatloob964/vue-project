var express = require('express');
var path = require('path');
const history = require('connect-history-api-fallback');

let app = express();

const staticFileMiddleware = express.static(path.join(__dirname + '/dist/'));

app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);

var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started '+ port);
