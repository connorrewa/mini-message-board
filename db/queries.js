const pool = require('./pool');

async function getAllMessages() {
    const { rows } = await pool.query('SELECT * from messages');
    return rows;
}

async function postNewMessage(text, name) {
    const query = `
        INSERT INTO messages (message, username)
        VALUES ($1, $2)
        RETURNING *;`; // This will return the inserted row

    const values = [text, name];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0]; // Return the newly created message
    } catch (err) {
        console.error('Error inserting new message:', err);
        throw err; // Re-throw the error after logging it
    }
}

async function getMessageById(id) {
    console.log('id', id);
    const query = 'SELECT * FROM messages WHERE id = $1'; // Use parameterized query to avoid SQL injection
    const values = [id];

    try {
        const { rows } = await pool.query(query, values);

        // Check if a message was found and return it
        if (rows.length > 0) {
            return rows[0]; // Return the message object
        } else {
            return null; // No message found with the given ID
        }
    } catch (err) {
        console.error('Error retrieving message by ID:', err);
        throw err; // Re-throw the error after logging it
    }
}

module.exports = {
    getAllMessages,
    postNewMessage,
    getMessageById,
};
