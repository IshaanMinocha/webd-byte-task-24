import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: 'http://localhost:5173/unauthorized',
}), (req, res) => {
  const ghToken = req.user.token;
  res.redirect(`http://localhost:5173/authorizefirst?ghtoken=${ghToken}`);
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: 'http://localhost:5173/unauthorized',
}), (req, res) => {
  const ytToken = req.user.token;
  res.redirect(`http://localhost:5173/authorizefirst?yttoken=${ytToken}`);
});

export default router;
