import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, MapPin, List, LogOut } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { logout,user, isAuthenticated, isLoading } = useAuth0();
  const [tasks, setTasks] = useState([]);

useEffect(() => {
  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `https://byte404.onrender.com/api/tasks/user/1234`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      const formattedTasks = data.map(task => ({
        id: task.task_id,
        name: task.task_description,
        date: new Date(task.created_at).toLocaleDateString(),
        location: `${task.location.latitude}, ${task.location.longitude}`
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  fetchTasks();
}, []);


  const handleGetStarted = () => {
    localStorage.clear();
    sessionStorage.clear();
    // Option 1: Using window.location (works without any routing library)
    logout({
      returnTo: window.location.origin = "/home",
    });
    

    // Option 2: If using react-router-dom, comment out the above line and uncomment the next line
    // navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Task Trail</h1>
            <button className="text-gray-500 hover:text-gray-700">
              <LogOut size={20} onClick={handleGetStarted} />
            </button>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                      <List className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Tasks
                        </dt>
                        <dd className="text-3xl font-semibold text-gray-900">
                          {tasks.length}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Completed Tasks
                        </dt>
                        <dd className="text-3xl font-semibold text-gray-900">
                          {/* Replace with dynamic count if available */}
                          0
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Location-based Tasks
                        </dt>
                        <dd className="text-3xl font-semibold text-gray-900">
                          {/* Replace with dynamic count if available */}
                          0
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recent tasks */}
            <div className="mt-8">
              <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Recent Tasks
              </h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <motion.li
                      key={task.id}
                      whileHover={{ backgroundColor: "#f3f4f6" }}
                    >
                      <Link
                        to={`/tasks/${task.id}`}
                        className="block hover:bg-gray-50"
                      >
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-purple-600 truncate">
                              {task.name}
                            </p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {task.date}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                {task.location}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
