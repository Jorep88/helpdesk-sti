const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Helpdesk API is running');
});

// Aquí añadiremos más rutas posteriormente

// ... (código anterior)

const ticketRoutes = require('./routes/tickets');

app.use('/api/tickets', ticketRoutes);

// ... (código posterior)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});