import { Router } from 'express';
import axios from 'axios';

const router = Router();

const YOUTUBE_CHANNEL_ID = 'UCgIzTPYitha6idOdrr7M8sQ';
const GITHUB_USERNAME = 'bytemait';

router.post('/verify-following', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'GitHub token is missing' });
  }

  try {
    const response = await axios.get(
      `https://api.github.com/user/following/${GITHUB_USERNAME}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 204) {
      return res.json({ verified: true });
    } else {
      return res.json({ verified: false });
    }
  } catch (error) {
    console.error('Error verifying GitHub following:', error.response?.data || error);
    return res.status(500).json({ error: 'Failed to verify following' });
  }
});

router.post('/verify-subscription', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'YouTube token is missing' });
  }

  try {
    let isSubscribed = false;
    let nextPageToken = '';

    do {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50&pageToken=${nextPageToken}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const subscriptions = response.data.items;
      isSubscribed = subscriptions.some(
        (subscription) => subscription.snippet.resourceId.channelId === YOUTUBE_CHANNEL_ID
      );

      nextPageToken = response.data.nextPageToken;
    } while (nextPageToken && !isSubscribed);

    return res.json({ verified: isSubscribed });
  } catch (error) {
    console.error('Error verifying YouTube subscription:', error.response?.data || error);
    return res.status(500).json({ error: 'Failed to verify subscription' });
  }
});

export default router;
