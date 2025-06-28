"use strict";
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const { routers } = require('./routes/route');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(routers());
app.use(express.json());
// Sync database and start server
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
