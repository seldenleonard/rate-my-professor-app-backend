require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const reviewsDb = require('./reviews-queries');
const professorsDb = require('./professors-queries');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API', env: process.env.NODE_ENV });
});

app.get('/professors', professorsDb.getProfessors);
app.get('/professors/:id', professorsDb.getProfessorById);
app.post('/professors', professorsDb.createProfessor);
app.put('/professors/:id', professorsDb.updateProfessor);
app.delete('/professors/:id', professorsDb.deleteProfessor);
app.get('/reviews', reviewsDb.getReviews);
app.get('/reviews/:id', reviewsDb.getReviewById);
app.post('/reviews', reviewsDb.createReview);
app.put('/reviews/:id', reviewsDb.updateReview);
app.delete('/reviews/:id', reviewsDb.deleteReview);


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});