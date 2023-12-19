const express = require('express');
require('dotenv').config();
const path = require('path');
var cors = require('cors');

const app = express()
const port = (process.env.PORT || '3004')
const usersRouter = require('../routes/users');
const placesRouter = require('../routes/places');

app.use(express.json());
app.use(cors());

app.use('/users', usersRouter);
app.use('/places', placesRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => console.log(`listening on port ${port}`));