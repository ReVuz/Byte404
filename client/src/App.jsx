import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { Home as HomeIcon, ListTodo, User } from "lucide-react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Task from "./pages/Task";
import Profile from "./pages/Profile";
import MainPage from "./pages/MainPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // This is a simple authentication. In a real app, you'd verify credentials against a backend.
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/home" element={<MainPage />} />
          <Route
            path="/task"
            element={isAuthenticated ? <Task /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>

        {isAuthenticated && (
          <nav className="bg-white shadow-md fixed bottom-0 left-0 right-0">
            <div className="flex justify-around p-3">
              <Link
                to="/"
                className="flex flex-col items-center text-gray-600 hover:text-purple-600 transition"
              >
                <HomeIcon size={24} />
                <span className="text-xs mt-1">Home</span>
              </Link>
              <Link
                to="/task"
                className="flex flex-col items-center text-gray-600 hover:text-purple-600 transition"
              >
                <ListTodo size={24} />
                <span className="text-xs mt-1">Task</span>
              </Link>
              <Link
                to="/profile"
                className="flex flex-col items-center text-gray-600 hover:text-purple-600 transition"
              >
                <User size={24} />
                <span className="text-xs mt-1">Profile</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </Router>
  );
};

export default App;
