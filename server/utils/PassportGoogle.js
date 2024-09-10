import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import envConfig from '../config/dotenv.js';

envConfig();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    profile.token = accessToken;
    done(null, profile)
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));