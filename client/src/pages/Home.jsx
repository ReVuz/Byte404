import React, { useState, useRef, useEffect } from 'react';

const Home = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradientStart to-gradientEnd text-black font-champaign p-6 space-y-8">
      {/* Welcome Message */}
      <div className="text-center animate-fadeIn">
        <h1 className="text-3xl font-bold mb-2">TaskTrail</h1>
        <p className="text-lg"></p>
      </div>

      {/* Recent Shapes Card */}
      <div className="bg-white bg-opacity-10 border-2 backdrop-blur-sm p-4 rounded-xl shadow-md animate-slideUp">
        <h2 className="text-xl font-semibold mb-2 text-center"></h2>
      </div>

    </div>
  );
};

export default Home;
