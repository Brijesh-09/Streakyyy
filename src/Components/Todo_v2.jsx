import React, { useState, useEffect } from "react";
import { getTodos, addTodo, addContribution } from "../Services/todoservice"; // Import the functions

const Todo_v2 = () => {
  const [task, setTask] = useState(null); // Track selected task
  const [inputText, setInputText] = useState(""); // Track input box value for task name
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [showAddModal, setShowAddModal] = useState(false); // Add task modal visibility
  const [todos, setTodos] = useState([]); // Track tasks

  // Fetch tasks when the component mounts
  const fetchTodos = async () => {
    try {
      const data = await getTodos(); // Call the API
      if (Array.isArray(data)) {
        setTodos(data); // Set state with fetched todos if it's an array
      } else {
        console.error("Error: Data is not an array.");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch todos on component mount
  }, []);

  const seeContributions = (todo) => {
    setTask(todo); // Set the clicked task
    setShowModal(true); // Show modal
    console.log("Task Clicked");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowAddModal(false); // Close the add task modal
    setInputText(""); // Clear input when closing the modal
  };

  const handleSave = async () => {
    if (!inputText.trim()) {
      alert("Task name cannot be empty.");
      return;
    }

    if (task) {
      // Add contribution for the existing task
      try {
        const updatedTask = await addContribution(task._id, inputText);
        console.log("Contribution added:", updatedTask); // Log the updated task
        fetchTodos(); // Refresh tasks from the backend after updating
      } catch (error) {
        console.error("Error adding contribution:", error);
      }
    } else {
      // Add a new task
      const newTask = { taskName: inputText }; // Only include taskName
      try {
        const response = await addTodo(newTask); // Add new task via API
        if (response && response.todo) {
          fetchTodos(); // Refresh tasks from the backend after adding
          console.log("New task added:", response.todo);
        } else {
          console.error("Error: Invalid task object returned from API.");
        }
      } catch (error) {
        console.error("Error adding new task:", error);
      }
    }
    handleCloseModal(); // Close modal after saving
  };

  const handleAddTask = () => {
    setShowAddModal(true); // Show add task modal
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8 px-4">
      {/* Add Task Button */}
      <button
        onClick={handleAddTask}
        className="absolute top-4 right-4 py-2 px-6 bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all"
      >
        Add Task
      </button>

      {/* Title Section */}
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Consistency is the Key
      </h2>

      {/* Task List */}
      <div className="w-full max-w-2xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Tasks</h3>

        <ul className="space-y-4">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <li
                onClick={() => seeContributions(todo)} // Pass the task as argument
                key={todo._id} // Use _id as the key for each task
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition-all"
              >
                <span className="text-lg font-medium text-gray-800">
                  {todo.taskName || "Unnamed Task"}
                </span>
                <span className="text-sm text-gray-600">{todo.streak || 0} 🔥</span>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500">No tasks found!</li>
          )}
        </ul>
      </div>

      {/* Modal for Existing Task */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4">{task?.taskName}</h3>
            <input
              type="text"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your update"
            />
            <div className="flex justify-between">
              <button
                onClick={handleSave}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding New Task */}
      {showAddModal && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4">Add New Task</h3>
            <input
              type="text"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter task name"
            />
            <div className="flex justify-between">
              <button
                onClick={handleSave}
                className="py-2 px-4 bg-orange-400 text-white rounded-lg hover:bg-blue-600"
              >
                Add Task
              </button>
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo_v2;
