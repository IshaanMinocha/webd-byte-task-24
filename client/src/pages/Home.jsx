import React from 'react';
import { Link } from 'react-router-dom';
import DottedButton from '../components/DottedButton';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <h1 className="text-5xl font-bold mb-20 text-dark lowercase">WebDev Recruitment Task</h1>
      <div className="flex flex-col-2 gap-4">
        <Link to="/public">
          <DottedButton>/public</DottedButton>
        </Link>
        <Link to="/private">
          <DottedButton>/private</DottedButton>
        </Link>
      </div>
    </div>
  );
};

export default Home;