const fs = require('fs');
const path = require('path');

const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);
server.options('*', cors());

// need for imitation of delay
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800);
  });

  next();
});

// Endpoint for common
server.post('/login', (req, res) => {
  const { username, password } = req.body;

  const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
  const { users } = db;

  const userFromDb = users.find((user) => user.username === username && user.password === password);

  if (userFromDb) {
    return res.json(userFromDb);
  }

  return res.status(403).json({ message: 'AUTH ERROR' });
});

// need to check if user is authorized
// eslint-disable-next-line consistent-return
server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'AUTH ERROR' });
  }

  next();
});

server.use(router);

// launch the server
server.listen(8000, () => {
  console.log('server is running on 8000 port');
});
