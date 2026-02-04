require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const connectDB = require('./data/mongoose');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

// =======================
// CONNECT DATABASE FIRST
// =======================
connectDB();

// =======================
// BASIC MIDDLEWARE
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// SESSION CONFIGURATION
// =======================
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    }
  })
);

// =======================
// PASSPORT INITIALIZATION
// =======================
app.use(passport.initialize());
app.use(passport.session());

// =======================
// PASSPORT GITHUB STRATEGY
// =======================
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          user = await User.create({
            githubId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            profileUrl: profile.profileUrl
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// =======================
// SERIALIZATION
// =======================
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// =======================
// ROUTES
// =======================
app.use('/', require('./routes/index'));

// =======================
// ERROR HANDLING
// =======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Server Error',
    message: err.message
  });
});

// =======================
// START SERVER
// =======================
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
