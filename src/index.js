const express = require('express');
const { connectDb } = require('./db/mongoose');
const userRouter = require('./routes/userRouter');
const itemRouter = require('./routes/itemRouter');

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(itemRouter);
const port = process.env.DB_PORT || 3000;

app.listen(port, () => {
    console.log(`Web server started on port ${port}!`);
    connectDb();
});

