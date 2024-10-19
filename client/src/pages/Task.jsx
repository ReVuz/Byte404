import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, MapPin } from 'lucide-react'

export default function Task() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [task, setTask] = useState({
    name: '',
    time: '',
    date: '',
    description: '',
    isLocationBased: false,
    latitude: null,
    longitude: null,
  })

  const handlePromptSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the prompt to a backend service
    // that would process it and return structured task data.
    // For this example, we'll just set some dummy data.
    setTask({
      name: 'Task generated from prompt',
      time: '14:00',
      date: '2023-05-20',
      description: prompt,
      isLocationBased: false,
      latitude: null,
      longitude: null,
    })
    setIsModalOpen(true)
  }

  const handleTaskSubmit = (e) => {
    e.preventDefault()
    // Here you would typically save the task to your backend
    console.log('Task submitted:', task)
    setIsModalOpen(false)
    setPrompt('')
    setTask({
      name: '',
      time: '',
      date: '',
      description: '',
      isLocationBased: false,
      latitude: null,
      longitude: null,
    })
  }

  const handleLocationToggle = () => {
    if (!task.isLocationBased) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setTask({
            ...task,
            isLocationBased: true,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          console.error('Error getting location:', error)
          alert('Unable to get your location. Please try again.')
        }
      )
    } else {
      setTask({
        ...task,
        isLocationBased: false,
        latitude: null,
        longitude: null,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Create a New Task</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Enter a description of your task, and we'll help you structure it.</p>
          </div>
          <form onSubmit={handlePromptSubmit} className="mt-5">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="E.g., Meet John at Central Park tomorrow at 2 PM to discuss the project proposal"
            />
            <button
              type="submit"
              className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Create Task
            </button>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end  justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            >
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Task Details</h3>
                  <div className="mt-2">
                    <form onSubmit={handleTaskSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Task Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={task.name}
                            onChange={(e) => setTask({ ...task, name: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date
                          </label>
                          <input
                            type="date"
                            name="date"
                            id="date"
                            value={task.date}
                            onChange={(e) => setTask({ ...task, date: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                            Time
                          </label>
                          <input
                            type="time"
                            name="time"
                            id="time"
                            value={task.time}
                            onChange={(e) => setTask({ ...task, time: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={task.description}
                            onChange={(e) => setTask({ ...task, description: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            id="location-based"
                            name="location-based"
                            type="checkbox"
                            checked={task.isLocationBased}
                            onChange={handleLocationToggle}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                          />
                          <label htmlFor="location-based" className="ml-2 block text-sm text-gray-900">
                            Location-based task
                          </label>
                        </div>
                        {task.isLocationBased && (
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <span>
                              Lat: {task.latitude?.toFixed(6)}, Long: {task.longitude?.toFixed(6)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Save Task
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:w-auto sm:text-sm"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}