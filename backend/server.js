const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
const path = require("path");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "/../build")));
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname + "/../build/index.html"));
});


const uri = "mongodb+srv://lewis517:abc123!@cluster0-bzetj.gcp.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB connected successfully")
});

const customersRouter = require('./routes/customers');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

app.use('/api/customers', customersRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});