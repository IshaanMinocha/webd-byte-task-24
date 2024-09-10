import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/get-github-following', async (req, res) => {
  try {
    const token = req.user.token;
    const response = await axios.get('https://api.github.com/user/following', {
      headers: { Authorization: `token ${token}` }
    });
    const following = response.data.map(user => user.login);
    res.json(following);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch GitHub following.' });
  }
});

router.get('/get-youtube-subscription', async (req, res) => {
});

export default router;
