"use strict";
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const { routers } = require('./routes/route');
require('dotenv').config();
require('./models');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routers);

sequelize.sync({ force: false }).then(() => {
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
