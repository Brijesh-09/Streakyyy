import React, { useState, useEffect } from "react";
import { getTodos } from "../Services/todoservice"; // Import the function to fetch tasks

export const Todo = () => {
  const [todos, setTodos] = useState([]); // State to hold the tasks from the API
  const [selectedTask, setSelectedTask] = useState(null); // State to hold the clicked task
  const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [contribution, setContribution] = useState(""); // State to store user input for contribution

  // Fetch tasks when the component mounts
  const fetchTodos = async () => {
    try {
      const data = await getTodos(); // Call the API to get tasks
      if (Array.isArray(data)) {
        setTodos(data); // Set state with fetched tasks if it's an array
      } else {
        console.error("Error: Data is not an array.");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch tasks when the component mounts
  }, []);

  // Close the modal
  const closeModal = () => {
    setSelectedTask(null); // Clear the selected task
    setModalVisible(false); // Hide the modal
    setContribution(""); // Reset contribution input field
  };

  // Handle Add/Update task
  const addUpdate = async () => {
    // Logic for adding or updating tasks (you can implement this later)
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-4">Welcome to Streaky 🔥</h1>
        <p className="text-lg text-center mb-6">Your Daily Tasks and streaks.</p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <ul className="space-y-2">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <li
                  key={todo._id} // Assuming _id is the unique identifier
                  className="flex justify-between bg-white shadow-md rounded p-2 hover:bg-gray-300 cursor-pointer"
                  onClick={() => {
                    setSelectedTask(todo); // Set the selected task when clicked
                    setModalVisible(true); // Show the modal to add a contribution or update
                  }}
                >
                  <span>{todo.taskName || "Unnamed Task"}</span>
                  <span>{todo.streak || 0} 💎</span>
                </li>
              ))
            ) : (
              <li className="text-center text-gray-500">No tasks found!</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
