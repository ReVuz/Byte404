import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically "log in" after a short delay
    const timer = setTimeout(() => {
      onLogin();
      navigate("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLogin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-red-200">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-2xl w-96 text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Welcome to Task Trail
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Logging in...
        </p>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
      </motion.div>
    </div>
  );
}
