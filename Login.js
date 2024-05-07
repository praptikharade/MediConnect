const db = require('./TestConnectivity');

function loginUser(username, password, callback) {
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            callback(new Error('User not found or incorrect password'));
        } else {
            callback(null, result[0].name);
        }
    });
}

module.exports = loginUser;
