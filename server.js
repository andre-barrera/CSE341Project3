require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const connectDB = require('./data/mongoose');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

/* 🔑 REQUIRED FOR RENDER */
app.set('trust proxy', 1);

// Connect DB
connectDB();

// CORS (needed for Swagger + sessions)
app.use(cors({
  origin: true,
  credentials: true
}));

// Session (CRITICAL FIX)
app.use(session({
  name: 'sessionId',
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,      // REQUIRED on Render (HTTPS)
    sameSite: 'none'   // REQUIRED for OAuth
  }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/index'));

// Passport strategy
passport.use(new GitHubStrategy(
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
          email: profile.emails?.[0]?.value || ''
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// OAuth callback
app.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => res.redirect('/')
);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
