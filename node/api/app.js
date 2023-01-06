/* Application Server with Port Listener */
const server = require('./src/server');
const port = (process.env.PORT || 3000);
const handler = (port) => console.log(`App listening at http://localhost:${ port }`);

server.listen(port, handler(port));
