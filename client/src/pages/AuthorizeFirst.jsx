import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DottedButton from '../components/DottedButton';
import axios from 'axios';
import { FaGoogle, FaGithub } from "react-icons/fa";

const AuthorizeFirst = ({ setIsVerified }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoggedInGitHub, setIsLoggedInGitHub] = useState(false);
  const [githubProfilePic, setGitHubProfilePic] = useState('');
  const [githubName, setGitHubName] = useState('');
  const [isLoggedInGoogle, setIsLoggedInGoogle] = useState(false);
  const [googleProfilePic, setGoogleProfilePic] = useState('');
  const [googleName, setGoogleName] = useState('');
  const [loadingFollowing, setLoadingFollowing] = useState(false);
  const [loadingSubscription, setLoadingSubscription] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchGitHubProfile = async (ghToken) => {
    try {
      const response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${ghToken}`,
        },
      });
      // console.log("github: " + response.data)
      const { avatar_url, login } = response.data;
      setGitHubProfilePic(avatar_url);
      setGitHubName(login);
      setIsLoggedInGitHub(true);
    } catch (err) {
      console.error('Error fetching GitHub profile:', err);
    }
  };

  const fetchGoogleProfile = async (ytToken) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${ytToken}`);
      // console.log("google: " + response.data)
      const { picture, name } = response.data;
      setGoogleProfilePic(picture);
      setGoogleName(name);
      setIsLoggedInGoogle(true);
    } catch (err) {
      console.error('Error fetching Google profile:', err);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const ghToken = queryParams.get('ghtoken');
    const ytToken = queryParams.get('yttoken');

    if (ghToken) {
      localStorage.setItem('ghToken', ghToken);
      fetchGitHubProfile(ghToken);
    } else {
      const storedGhToken = localStorage.getItem('ghToken');
      if (storedGhToken) {
        fetchGitHubProfile(storedGhToken);
      }
    }
    if (ytToken) {
      localStorage.setItem('ytToken', ytToken);
      fetchGoogleProfile(ytToken);
    } else {
      const storedYtToken = localStorage.getItem('ytToken');
      if (storedYtToken) {
        fetchGoogleProfile(storedYtToken);
      }
    }
    navigate('/authorizefirst')
  }, [location]);

  const handleGoogleLogin = async () => {
    window.open(`${backendUrl}/auth/google`, "_self")
  };

  const handleGitHubLogin = async () => {
    window.open(`${backendUrl}/auth/github`, "_self")
  };

  const handleVerifySubscription = async () => {
    setLoadingSubscription(true);
    try {
      const response = await axios.post(`${backendUrl}/api/verify-subscription`, {
        token: localStorage.getItem('ytToken')
      });
      if (response.data.verified) {
        setIsSubscribed(true);
      }
    } catch (err) {
      setError('Error verifying subscription.');
    } finally {
      setLoadingSubscription(false);
    }
  };

  const handleVerifyFollowing = async () => {
    setLoadingFollowing(true);
    try {
      const response = await axios.post(`${backendUrl}/api/verify-following`, {
        token: localStorage.getItem('ghToken')
      });
      if (response.data.verified) {
        setIsFollowing(true);
      }
    } catch (err) {
      setError('Error verifying following.');
    } finally {
      setLoadingFollowing(false);
    }
  };

  const handleGoToPrivate = () => {
    if (isSubscribed && isFollowing) {
      setIsVerified(true);
      navigate('/private');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <h1 className="text-4xl font-bold mb-10 text-dark">authorization required</h1>
      {isLoggedInGitHub && isLoggedInGoogle ? <p className='text-dark text-xl mb-2'>logged in as: </p> : <p className='text-dark text-xl mb-2'>login first: </p>}
      <div className="flex gap-20 mb-10">
        <div>
          {isLoggedInGoogle ? (
            <div className="flex flex-col items-center">
              <img src={googleProfilePic} alt="Google Profile" className="w-16 h-16 rounded-full" />
              <p className="text-dark mt-2">{googleName}</p>
            </div>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="p-5 bg-dark text-2xl text-light rounded-full"
            >
              <FaGoogle />
            </button>
          )}
        </div>
        <div>
          {isLoggedInGitHub ? (
            <div className="flex flex-col items-center">
              <img src={githubProfilePic} alt="GitHub Profile" className="w-16 h-16 rounded-full" />
              <p className="text-dark mt-2">{githubName}</p>
            </div>
          ) : (
            <button
              onClick={handleGitHubLogin}
              className="p-5 text-2xl bg-dark text-light rounded-full"
            >
              <FaGithub />
            </button>
          )}
        </div>
      </div>
      <p className='text-dark text-xl mb-2'>verify now: </p>
      <div className="flex flex-col-2 gap-4 mb-20">
        <button
          className={`p-3 bg-dark text-light rounded ${!isLoggedInGoogle ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleVerifySubscription}
          disabled={!isLoggedInGoogle}
        >
          {loadingSubscription ? "checking..." : isSubscribed ? "verified!" : "verify yt subscription"}
        </button>
        <button
          className={`p-3 bg-dark text-light rounded ${!isLoggedInGitHub ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleVerifyFollowing}
          disabled={!isLoggedInGitHub}
        >
          {loadingFollowing ? "checking..." : isFollowing ? "verified!" : "verify gh following"}
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <DottedButton
        className="p-3 bg-gray-500 text-white rounded"
        disabled={!(isSubscribed && isFollowing)}
        onClick={handleGoToPrivate}
      >
        proceed to /private
      </DottedButton>
    </div>
  );
};

export default AuthorizeFirst;