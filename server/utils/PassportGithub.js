import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import envConfig from '../config/dotenv.js';

envConfig();

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:8000/auth/github/callback',
}, (accessToken, refreshToken, profile, done) => {
  profile.token = accessToken;
  return done(null, profile);
}));


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
