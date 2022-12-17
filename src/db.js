const { Pool } = require('pg');
console.log('client gotten');
const db_client = new Pool({
  connectionString:
    'postgres://user:avhL0uyR57UH1JgjQUOA40FFcfnvxKuU@dpg-cef4dko2i3mum5u8ckug-a.oregon-postgres.render.com/users_014a',
  ssl: {
    rejectUnauthorized: false,
  },
});
db_client.connect(async function (err) {
  if (err) throw err;
  console.log('Connected!');
  await db_client.query(`CREATE TABLE IF NOT EXISTS kk (
			number VARCHAR(20) UNIQUE NOT NULL PRIMARY KEY
		);`);
  console.log('db created');
});

module.exports = db_client;
