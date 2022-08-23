const { Pool } = require('pg');
console.log('client gotten');
const db_client = new Pool({
  connectionString:
    'postgres://efokczuviswuly:66fafc7c5f9c01af12206c099d55ee73181d2fac044a27eb1035c73c9373718a@ec2-44-193-178-122.compute-1.amazonaws.com:5432/d4umkcdictl8o2',
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
