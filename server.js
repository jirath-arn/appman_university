const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const port = process.env.APP_PORT || 8000;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
