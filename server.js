// server.js
import jsonServer from 'json-server';
import auth from 'json-server-auth';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const rules = auth.rewriter({
  users: 600,
  posts: 640,
});

server.db = router.db;
server.use(middlewares);
server.use(rules);
server.use(auth);
server.use(router);

server.listen(3000, () => {
  console.log('✅ JSON Server with Auth is running at http://localhost:3000');
});
