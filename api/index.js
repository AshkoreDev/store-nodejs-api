const express = require('express');
const cors = require('cors');
const { configOptions } = require('./config/config.js');


const app = express();
const port = configOptions.port;

const whiteList = ['http://localhost:3000'];

const corsOptions = {

  origin: (origin, callback) => {

    (whiteList.indexOf(origin) !== -1 || !origin)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'));
  }
};

app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => res.send('HOME'));

app.listen(port, () => console.log(`http://localhost:${port}`));