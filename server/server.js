const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookingRoute = require('./api-routes/booking');
const webSocketService = require('./services/webSocketService');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', bookingRoute);

webSocketService.init(server);

const port = 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
