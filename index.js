const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

const professorsDb = require('./professors-queries');

app.get('/professors', professorsDb.getProfessors);
app.get('/professors/:id', professorsDb.getProfessorById);
app.post('/professors', professorsDb.createProfessor);
app.put('/professors/:id', professorsDb.updateProfessor);
app.delete('/professors/:id', professorsDb.deleteProfessor);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});