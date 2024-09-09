import React from 'react';

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="p-8 bg-dark rounded-lg shadow-lg text-center text-light">
        <h1 className="text-4xl font-bold text-light mb-10">intruder alert</h1>
        <p className="text-lg mb-4">you are unauthorized to access this page</p>
        <a href="/" className="text-primary underline">back to home</a>
      </div>
    </div>
  );
};

export default Unauthorized;