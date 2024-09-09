import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DottedButton from '../components/DottedButton';

const AuthorizeFirst = ({ setIsVerified }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  const handleVerifySubscription = () => {
    setIsSubscribed(true);
  };

  const handleVerifyFollowing = () => {
    setIsFollowing(true);
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
      <div className="flex flex-col-2 gap-4 mb-20">
        <button
          className={`p-3 bg-dark text-light rounded ${isSubscribed ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleVerifySubscription}
          disabled={isSubscribed}
        >
          {isSubscribed ? "yt subscription verified" : "verify yt subscription status to byte"}
        </button>
        <button
          className={`p-3 bg-dark text-light rounded ${isFollowing ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleVerifyFollowing}
          disabled={isFollowing}
        >
          {isFollowing ? "gh following verified" : "verify gh following status to byte"}
        </button>
      </div>
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