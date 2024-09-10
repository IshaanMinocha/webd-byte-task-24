import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/unauthorized',
}), (req, res) => {
  const ghToken = req.user.token;
  res.redirect(`/authorizefirst?ghtoken=${ghToken}`);
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/youtube.readonly'] }));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/unauthorized',
}), (req, res) => {
  const ytToken = req.user.token;
  res.redirect(`/authorizefirst?yttoken=${ytToken}`);
});

export default router;
