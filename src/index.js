const express = require('express');
const { connectDb } = require('./db/mongoose');

const app = express();
const port = process.env.DB_PORT || 3000;

app.listen(port, () => {
    console.log(`Web server started on port ${port}!`);
    connectDb();
});

