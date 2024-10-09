const { Pool } = require('pg');
require('dotenv').config();

module.exports = new Pool({
    connectionString: process.env.PUBLIC_DB_STRING,
});
