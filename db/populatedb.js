const { Client } = require('pg');
require('dotenv').config();

const SQL = `
    create table if not exists messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message VARCHAR(255),
    username VARCHAR(255),
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
     
    INSERT INTO messages (message, username)
    values ('Hello there', 'Connor'),
    ('Hi to you too!', 'Jake');
     
     `;

async function main() {
    console.log('seeding');
    const connectionString = process.env.PUBLIC_DB_STRING;

    const client = new Client({
        connectionString,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
}

main();

// module.exports = pool;
