const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers'); // assuming you have an index.js file in your controllers directory that exports your routes
const sequelize = require('./config/connection'); // assuming you have a connection.js file in a config directory
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET, // this should be set in your .env file
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(methodOverride('_method'));
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.logged_in = req.session.logged_in;
  next();
});

// Create an instance of express-handlebars with custom helper functions
const hbs = exphbs.create({
  defaultLayout: 'main',
  partialsDir: path.join(__dirname, '/views/partials'),
  helpers: {
    formatDate: (date) => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    },
  },
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

// Use the instance with the helpers and runtime options to set up the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
