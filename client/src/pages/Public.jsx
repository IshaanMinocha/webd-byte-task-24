import React from 'react';

const Public = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="p-8 bg-dark rounded-lg shadow-lg text-center text-light">
        <h1 className="text-4xl font-bold mb-10">public page</h1>
        <p className="text-lg">this page is accessible to everyone without any restrictions</p>
      </div>
    </div>
  );
};

export default Public;