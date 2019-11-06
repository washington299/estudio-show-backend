const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

dotenv.config({ path: 'variables.env' });

require('./database');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
