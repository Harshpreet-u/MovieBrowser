const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
//const userListRoutes = require('./Routes/UserList');

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true // Optional if you're using cookies
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

//app.use('/api/lists', require('./Routes/UserList'));
app.use('/auth', AuthRouter);

app.get("/api/get-key", (req, res) => {
  res.json({ apiKey: process.env.API_KEY });
});

app.get("/ping", (req,res) => {
    res.send("here at ping");
});

app.get("/", (req, res) => {
  res.send("Hello from the backend root!");
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});