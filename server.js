import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.post('/submissions', (req, res) => {
  const submissions = router.db.get('submissions');
  const id = submissions.size() + 1; // Assign incremental ID
  const newEntry = { id, ...req.body }; // Add the id to the new entry
  submissions.push(newEntry).write();
  res.status(201).jsonp(newEntry);
});
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
