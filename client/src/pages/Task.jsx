import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";
import axios from "axios";
import { getCoordinatesFromGemini } from "./geminiApi"; // Assuming this is an external API utility

export default function Task() {
  const [task, setTask] = useState({
    name: "",
    description: "",
    isLocationBased: false,
    placeName: "",
    latitude: "10.0231",
    longitude: "72.2132",
  });

  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch place suggestions based on input
  useEffect(() => {
    const getPlaceSuggestions = async () => {
      if (task.placeName) {
        try {
          const response = await fetch(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${task.placeName}&apiKey=9161be85978f4ce488011c5ff8b77a67`
          );
          const data = await response.json();
          const suggestions = data.features.map(
            (feature) => feature.properties.formatted
          );
          setSuggestions(suggestions);
        } catch (error) {
          setError("Failed to get place suggestions. Please try again.");
        }
      } else {
        setSuggestions([]);
      }
    };

    getPlaceSuggestions();
  }, [task.placeName]);

  // Handle place selection and fetch coordinates
  const handlePlaceSelect = async (place) => {
    setTask({ ...task, placeName: place });
    setSuggestions([]);
    setIsLoading(true);
    setError(null);

    try {
      const coordinates = await getCoordinatesFromGemini(
        place,
        task.description
      );
      setTask((prevTask) => ({
        ...prevTask,
        placeName: place,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      }));
    } catch (err) {
      setError("Failed to get coordinates. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission and POST data to backend using axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      task_id: new Date().toISOString(), // Use current date/time as task_id
      user_id: "1234", // Static user_id for now
      task_description: task.description,
      task_type: task.isLocationBased ? "location-specific" : "general",
      location: task.isLocationBased
        ? {
            placeName: task.placeName,
            latitude: task.latitude,
            longitude: task.longitude,
          }
        : null,
    };

    try {
      const response = await axios.post(
        "https://byte404.onrender.com/api/tasks/",
        taskData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Task submitted successfully:", response.data);

      // Reset the form after successful submission
      setTask({
        name: "",
        description: "",
        isLocationBased: false,
        placeName: "",
        latitude: null,
        longitude: null,
      });
    } catch (error) {
      console.error("Error submitting task:", error.response || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Create a New Task
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Enter the details of your task below.</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Task Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={task.name}
                onChange={(e) => setTask({ ...task, name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={task.description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                id="location-based"
                name="location-based"
                type="checkbox"
                checked={task.isLocationBased}
                onChange={(e) =>
                  setTask({ ...task, isLocationBased: e.target.checked })
                }
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label
                htmlFor="location-based"
                className="ml-2 block text-sm text-gray-900"
              >
                Location-based task
              </label>
            </div>
            {task.isLocationBased && (
              <div>
                <label
                  htmlFor="placeName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="placeName"
                    id="placeName"
                    value={task.placeName}
                    onChange={(e) =>
                      setTask({ ...task, placeName: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    required={task.isLocationBased}
                  />
                  {suggestions.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="cursor-pointer select-none relative py-2 pl-3 pr-9 text-gray-900 hover:bg-purple-50"
                          onClick={() => handlePlaceSelect(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {isLoading && (
                  <p className="mt-2 text-sm text-gray-500">
                    Loading coordinates...
                  </p>
                )}
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                {task.latitude && task.longitude && (
                  <p className="mt-2 text-sm text-gray-500">
                    Coordinates: {task.latitude}, {task.longitude}
                  </p>
                )}
              </div>
            )}
            <div className="mt-5">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
