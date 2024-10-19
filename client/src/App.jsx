import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Task from './pages/Task';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Task" element={<Task />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        {/* Bottom Navigation Bar */}
<nav className="bg-gray-800 shadow-md fixed bottom-0 left-0 right-0">
  <div className="flex justify-around p-3">
    <Link to="/" className="flex flex-col items-center text-gray-300 hover:text-white transition">
      <span className="text-lg">🏠</span>
      <span className="text-xs">Home</span>
    </Link>
    <Link to="/Task" className="flex flex-col items-center text-gray-300 hover:text-white transition">
      <span className="text-lg">🖼️</span>
      <span className="text-xs">Task</span>
    </Link>
    <Link to="/Profile" className="flex flex-col items-center text-gray-300 hover:text-white transition">
      <span className="text-lg">🌟</span>
      <span className="text-xs">Profile</span>
    </Link>
  </div>
</nav>

      </div>
    </Router>
  );
};

export default App;