const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'rate_my_professor_app',
  password: 'password',
  port: 5432,
});

const getReviews = (request, response) => {
  pool.query('SELECT * FROM reviews ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getReviewById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM reviews WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createReview = (request, response) => {
  const { professorId, rating, text } = request.body;

  pool.query('INSERT INTO reviews (professor_id, rating, text) VALUES ($1, $2, $3)', [professorId, rating, text], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Review added with ID: ${results.insertId}`);
  });
};

const updateReview = (request, response) => {
  const id = parseInt(request.params.id);
  const { professorId, rating, text } = request.body;

  pool.query(
    'UPDATE reviews SET professor_id = $1, rating = $2, text = $3 WHERE id = $4',
    [professorId, rating, text, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Review modified with ID: ${id}`);
    }
  );
};

const deleteReview = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM reviews WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Review deleted with ID: ${id}`);
  });
};

module.exports = {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};