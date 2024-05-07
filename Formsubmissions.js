const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const registerUser = require('./Register');
const loginUser = require('./Login');

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);

    if (pathname === '/register' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username, name, password, confirmPassword } = querystring.parse(body);
            if (password !== confirmPassword) {
                res.end('Passwords do not match');
            } else {
                registerUser(username, name, password);
                res.end('Registration successful');
            }
        });
    } else if (pathname === '/login' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username, password } = querystring.parse(body);
            loginUser(username, password, (err, name) => {
                if (err) {
                    res.end(err.message);
                } else {
                    fs.readFile('HomePage.html', 'utf8', (err, data) => {
                        if (err) throw err;
                        const html = data.replace('<%= username %>', name);
                        res.end(html);
                    });
                }
            });
        });
    } else {
        // Handle other requests (e.g., serve login and registration forms)
    }
});

const PORT = process.env.PORT || 3306;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});