const http = require('node:http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from my GitHub Actions CI/CD application!\n');
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});

module.exports = server;
