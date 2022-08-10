const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const dotenv = require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 8080;


mongoose.connect('mongodb://localhost:27017/newtodo', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to MongoDB');
});

//middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/student',require('./routes/student'));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
