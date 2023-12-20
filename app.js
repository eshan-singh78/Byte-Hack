const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./model/User');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'your-secret-key', // Replace 'your-secret-key' with a random string (used to sign the session ID cookie)
  resave: false,
  saveUninitialized: false
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://byte-hack-user:bytehackdb-es@bytehack-db-es.ybloyrv.mongodb.net/bytehacktestdb-1?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// Routes
app.get('/', (req, res) => {
  res.render('index'); 
});

app.get('/login', (req, res) => {
    res.render('login'); 
});

app.get('/signup', (req, res) => {
    res.render('signup'); 
});

app.get('/about', (req, res) => {
    res.render('aboutus'); 
  });
  
app.get('/contact', (req, res) => {
    res.render('contactus'); 
});

app.get('/user-login', (req, res) => {
  res.render('userlogin'); 
});

app.get('/event-login', (req, res) => {
  res.render('eventlogin'); 
});


app.get('/contact', (req, res) => {
  res.render('contactus'); 
});

const isAuthenticated = (req, res, next) => {
  // Check if the user session contains the userId (indicating authentication)
  if (req.session.userId) {
    // User is authenticated, proceed to the next middleware/route handler
    next();
  } else {
    // User is not authenticated, redirect to the login page or any other page you want
    res.redirect('/login'); // Change this route to your login route
  }
};

// Apply the isAuthenticated middleware to the /user-dashboard route
app.get('/user-dashboard', isAuthenticated, (req, res) => {
  res.render('userdashboard');
});

app.get('/api/get-username', async (req, res) => {
  try {
    // Check if the user is logged in (authenticated)
    if (req.session.userId) {
      // Retrieve the user details based on the userId stored in the session
      const user = await User.findById(req.session.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Send the username as a response
      res.status(200).json({ username: user.fullName }); // Adjust this according to your user schema
    } else {
      // User is not authenticated, return an error or appropriate response
      res.status(401).json({ error: 'User not authenticated' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/logout', (req, res) => {
  // Destroy the session to logout the user
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Error logging out');
    }
    // Redirect the user to the login page after logout
    res.redirect('/login');
  });
});

//api logics
app.use('/', userRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
