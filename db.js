const Pool = require("pg").Pool;
const dotenv = require("dotenv").config();
const { user, password, host, database, port } = process.env;

const pool = new Pool({
  user,
  password,
  host,
  database,
  port,
});

module.exports = pool;
