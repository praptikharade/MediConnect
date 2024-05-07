const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const connection = require('./TestConnectivity');

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    let filePath = path.join(__dirname, 'HealthCare_Project', reqUrl.pathname);

    // Default to 'HomePage.html' if no specific page requested
    if (filePath === path.join(__dirname, 'HealthCare_Project', '/')) {
        filePath = path.join(__dirname, 'HealthCare_Project', 'HomePage.html');

    }

    if (req.method === 'GET') {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found!');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.method === 'POST') {
        if (reqUrl.pathname === '/Login') {
            console.log('__dirname:', __dirname);
            console.log('filePath:', filePath);
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const { email, password } = JSON.parse(body);
                connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
                    if (err) throw err;
                    if (result.length > 0) {
                        res.writeHead(302, { 'Location': '/HomePage' });
                        res.end();
                    } else {
                        console.log('__dirname:', __dirname);
                        console.log('filePath:', filePath);
                        res.writeHead(401);
                        res.end('Invalid credentials!');
                    }
                });
            });
        } else if (reqUrl.pathname === '/Register') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const { name, email, password, confirm_password } = JSON.parse(body);
                if (password !== confirm_password) {
                    res.writeHead(400);
                    res.end('Passwords do not match!');
                } else {
                    connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, result) => {
                        if (err) {
                            res.writeHead(500);
                            res.end('Error registering user!');
                        } else {
                            res.writeHead(302, { 'Location': '/login' });
                            res.end();
                        }
                    });
                }
            });
        }
    } else {
        res.writeHead(405);
        res.end('Method not allowed!');
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
