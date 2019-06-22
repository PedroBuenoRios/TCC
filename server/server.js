const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
const router = jsonServer.router(path.join(__dirname,'database.json'));

server.use(middlewares);
server.use('/', router);
server.listen(port, ()=>{
    console.log(`Json server is running on port ${port}`);
});