const Pool = require("pg").Pool;

require("dotenv").config();
const { user, password, host, database, database_port } = process.env;

const pool = new Pool({
  user,
  password,
  host,
  database,
  port: database_port,
});

module.exports = pool;
