const express = require('express');
const cors = require('cors');
const { configOptions } = require('./config/config.js');
const routerApi = require('./routes/index.js');
const { legErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler.js');

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
routerApi(app);
app.use((req, res) => res.status(404).json({ message: 'ERROR EN LA SOLICITUD.' }));

app.use(legErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler); 


app.listen(port, () => console.log(`http://localhost:${port}`));