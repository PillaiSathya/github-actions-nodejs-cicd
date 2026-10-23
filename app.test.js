const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const server = require('./app');

test('server responds with the expected message', async (t) => {
  await new Promise((resolve) => {
    if (server.listening) {
      resolve();
    } else {
      server.once('listening', resolve);
    }
  });

  t.after(() => {
    server.close();
  });

  const response = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:3000', (res) => {
      let body = '';

      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body });
      });
    }).on('error', reject);
  });

  assert.equal(response.statusCode, 200);
  assert.equal(
    response.body,
    'Hello from my GitHub Actions CI/CD application!\n'
  );
});
