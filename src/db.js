const { Client } = require('pg');
console.log('client gotten');
const db_client = new Client({
  user: 'postgres',
  host: 'kk.cxxmvgbkohpj.us-west-2.rds.amazonaws.com',
  database: 'kk',
  password: 'postgres',
  port: 5432,
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
