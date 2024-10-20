import React from "react";
import { Auth0Context, useAuth0 } from "@auth0/auth0-react";
import { Timeline } from "../lib/Scroll";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaBell, FaCheckCircle } from "react-icons/fa";

export default function MainPage() {
  const { loginWithRedirect } = useAuth0();

  const data = [
    {
      title: "Welcome to Task Trail",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Your personal task manager that follows you everywhere. From mountain peaks to ocean depths, we've got you covered.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src=".\src\assets\Screenshot 2024-10-20 090915.png"
              alt="Task Trail on mobile"
              className="rounded-lg object-cover h-32 md:h-56 lg:h-72 w-half shadow-lg"
            />
            <motion.img
              whileHover={{ scale: 1.05 }}
              src=".\src\assets\Screenshot 2024-10-20 090936.png"
              alt="Task Trail dashboard"
              className="rounded-lg object-cover h-32 md:h-56 lg:h-72 w-half shadow-lg"
            />
          </div>
        </motion.div>
      ),
    },
    {
      title: "Nearby Tasks",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <FaMapMarkerAlt className="text-blue-500 mr-2" />
            <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal">
              Discover and complete tasks in your vicinity.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src=".\src\assets\Screenshot 2024-10-20 090915.png"
              alt="Nearby tasks view"
              className="rounded-lg object-cover h-32 md:h-56 lg:h-72 w-half shadow-lg"
            />
            <motion.img
              whileHover={{ scale: 1.05 }}
              src=".\src\assets\Screenshot 2024-10-20 090936.png"
              alt="Task details"
              className="rounded-lg object-cover h-32 md:h-56 lg:h-72 w-half shadow-lg"
            />
          </div>
        </motion.div>
      ),
    },
    {
      title: "Geofence Alerts",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center mb-4">
            <FaBell className="text-yellow-500 mr-2" />
            <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal">
              Get notified about tasks when you enter specific areas.
            </p>
          </div>
          <div className="mb-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <motion.div whileHover={{ x: 5 }} className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-sm mb-2">
              📍 Task at Park Avenue
            </motion.div>
            <motion.div whileHover={{ x: 5 }} className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-sm mb-2">
              📍 Task near Ocean Beach
            </motion.div>
            <motion.div whileHover={{ x: 5 }} className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-sm">
              📍 Task by Downtown Office
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src=".\src\assets\Screenshot 2024-10-20 090943.png"
              alt="Geofence map"
              className="rounded-lg object-cover h-32 md:h-56 lg:h-72 w-half shadow-lg"
            />
            <motion.img
              whileHover={{ scale: 1.05 }}
              src=".\src\assets\Screenshot 2024-10-20 090936.png"
              alt="Geofence settings"
              className="rounded-lg object-cover h-32 md:h-56 lg:h-72 w-half shadow-lg"
            />
          </div>
        </motion.div>
      ),
    },
    {
      title: "Completed Tasks",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center mb-4">
            <FaCheckCircle className="text-green-500 mr-2" />
            <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal">
              Track your accomplishments based on your location history.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="Completed tasks overview"
              className="rounded-lg object-cover h-32 md:h-56 lg:h-72 w-half shadow-lg"
            />
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="https://assets.aceternity.com/cards.png"
              alt="Task completion details"
              className="rounded-lg object-cover h-32 md:h-56 lg:h-72 w-half shadow-lg"
            />
          </div>
        </motion.div>
      ),
    },
  ];
  
  return (
    <div className="w-full relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <nav className="absolute top-0 left-0 right-0 z-10 bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">Task Trail</span>
            </div>
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => loginWithRedirect()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Get Started
              </motion.button>              
            </div>
          </div>
        </div>
      </nav>
      
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Timeline data={data} />
      </main>
      
      <footer className="bg-white dark:bg-gray-800 shadow-md mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            © 2024 Task Trail. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}