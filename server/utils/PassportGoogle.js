import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import envConfig from '../config/dotenv.js';

envConfig();

const backendUrl = process.env.CORS_ORIGIN;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${backendUrl}/auth/google/callback`
},
  function (accessToken, refreshToken, profile, done) {
    profile.token = accessToken;
    done(null, profile)
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));