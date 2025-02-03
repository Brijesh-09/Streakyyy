import React, { useState, useEffect } from "react";
import { getTodos, addTodo, addContribution, deleteTodo } from "../Services/todoservice"; // Import the delete function
import { useNavigate } from "react-router-dom";

const Todo_v2 = () => {
  const [task, setTask] = useState(null);
  const [inputText, setInputText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      if (Array.isArray(data)) {
        setTodos(data);
      } else {
        console.error("Error: Data is not an array.");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const seeContributions = (todo) => {
    setTask(todo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowAddModal(false);
    setShowDeleteModal(false);
    setInputText("");
  };

  const handleSave = async () => {
    if (!inputText.trim()) {
      alert("Task name cannot be empty.");
      return;
    }

    if (task) {
      try {
        await addContribution(task._id, inputText);
        fetchTodos();
      } catch (error) {
        console.error("Error adding contribution:", error);
      }
    } else {
      try {
        const newTask = { taskName: inputText };
        await addTodo(newTask);
        fetchTodos();
      } catch (error) {
        console.error("Error adding new task:", error);
      }
    }
    handleCloseModal();
  };

  const confirmDelete = (todo) => {
    setTodoToDelete(todo);
    setShowDeleteModal(true);
  };

  const handleDelete = async (todoId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return; // If user cancels, do nothing
    }

    try {
      await deleteTodo(todoId);
      alert("Todo deleted successfully!");
      fetchTodos(); // Refresh the todo list after deletion
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Failed to delete todo: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 bg-gray-100">
      <button onClick={() => setShowAddModal(true)} className="absolute top-4 right-16 py-2 px-6 bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-600">
        Add Task
      </button>

      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Consistency is the Key</h2>

      <div className="w-full max-w-2xl">
        <h3 className="text-xl font-semibold text-gray-600 mb-4">Your Tasks✔️</h3>
        <ul className="space-y-4">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <li key={todo._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200">
                <span className="text-lg font-medium text-gray-800" onClick={() => seeContributions(todo)}>
                  {todo.taskName || "Unnamed Task"}
                </span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{todo.streak || 0} 🔥</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent click event
                      handleDelete(todo._id);
                    }}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 6h18M9 6v12M15 6v12M5 6l1-3h12l1 3"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500">No tasks found!</li>
          )}
        </ul>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete "{todoToDelete?.taskName}"?</p>
            <div className="flex justify-between mt-4">
              <button onClick={handleDelete} className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Delete
              </button>
              <button onClick={handleCloseModal} className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo_v2;
