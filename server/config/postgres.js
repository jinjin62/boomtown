const { Pool } = require('pg');

module.exports = app => {
  return new Pool({
    host: app.get('PG_HOST'),
    user: app.get('PG_USER'),
    password: app.get('PG_PASSWORD'),
    database: app.get('PG_DB'),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  });
};

// const pool = new Pool();

// pool.query('SELECT * FROM tags', (err, result) => {
//   if (err) {
//     return console.error('Error executing query', err.stack);
//   }
//   console.log(result);
// });

// pool
//   .query('SELECT * FROM tags')
//   .then(res => console.log(res))
//   .catch(err => console.error('Error executing query', err.stack));
  