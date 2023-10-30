`use strict`;

const server = require(`./lib/server`);
const PORT = (process.env.NODE_DOCKER_PORT || 3000);

server.listen(PORT, () => console.log(`Server Ready on: http://localhost:${ PORT }`));
