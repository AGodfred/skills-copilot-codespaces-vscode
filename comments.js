const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  if (req.url === '/comments') {
    fs.readFile('./comments.json', 'utf8', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}).listen(3000, () => console.log('running on http://localhost:3000'));