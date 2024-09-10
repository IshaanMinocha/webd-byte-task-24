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
  const [loadingFollowing, setLoadingFollowing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const ghToken = queryParams.get('ghtoken');
    const ytToken = queryParams.get('yttoken');
    
    if (ghToken) {
      localStorage.setItem('ghToken', ghToken);
    }

    if (ytToken) {
      localStorage.setItem('ytToken', ytToken);
    }
    navigate('/authorizefirst')
  }, [location]);

  const handleGoogleLogin = async () => {
    window.open(`${backendUrl}/auth/google`, "_self")
  };

  const handleGitHubLogin = async () => {
    window.open(`${backendUrl}/auth/github`, "_self")
  };

  const handleVerifySubscription = () => {
    setIsSubscribed(true);
  };

  const handleVerifyFollowing = async () => {
    setIsFollowing(true);
  }

  const handleGoToPrivate = () => {
    if (isSubscribed && isFollowing) {
      setIsVerified(true);
      navigate('/private');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <h1 className="text-4xl font-bold mb-10 text-dark">authorization required</h1>
      <p className='text-dark text-xl mb-2'>login first: </p>
      <div className="flex gap-4 mb-10">
        <button
          onClick={handleGoogleLogin}
          className="p-5 bg-dark text-2xl text-light rounded-full"
        >
          <FaGoogle />
        </button>
        <button
          onClick={handleGitHubLogin}
          className="p-5 text-2xl bg-dark text-light rounded-full"
        >
          {isLoggedInGitHub ? <img src={githubProfilePic} alt="Profile" /> : <FaGithub />}
        </button>
      </div>
      <p className='text-dark text-xl mb-2'>verify now: </p>
      <div className="flex flex-col-2 gap-4 mb-20">
        <button
          className={`p-3 bg-dark text-light rounded ${isSubscribed ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleVerifySubscription}
          disabled={isSubscribed}
        >
          {isSubscribed ? "yt subscription verified" : "verify yt subscription"}
        </button>
        <button
          className={`p-3 bg-dark text-light rounded ${!isLoggedInGitHub || isFollowing ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleVerifyFollowing}
          disabled={!isLoggedInGitHub || isFollowing}
        >
          {loadingFollowing ? "checking..." : isFollowing ? "gh following verified" : "verify gh following"}
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