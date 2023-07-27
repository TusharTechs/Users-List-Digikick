const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const DbConnect = require('./db/dbConnect');
const userRouter = require('./routes/userRoute');

const PORT = 5000;

dotenv.config();

const app = express();

DbConnect();

app.use(cors());

app.use(express.json());

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });