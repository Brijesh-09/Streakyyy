import React, { useState, useEffect } from "react";
import { getTodos, addTodo, addContribution, deleteTodo } from "../Services/todoservice";
import { useNavigate } from "react-router-dom";

const Todo_v2 = () => {
  const [task, setTask] = useState(null);
  const [inputText, setInputText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

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

  const seeContributions = (todo) => {
    setTask(todo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowAddModal(false);
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
      const newTask = { taskName: inputText };
      try {
        const response = await addTodo(newTask);
        if (response && response.todo) {
          fetchTodos();
        } else {
          console.error("Error: Invalid task object returned from API.");
        }
      } catch (error) {
        console.error("Error adding new task:", error);
      }
    }
    handleCloseModal();
  };

  const openDeleteConfirmation = (todo) => {
    setTodoToDelete(todo);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!todoToDelete) return;
    try {
      await deleteTodo(todoToDelete._id);
      alert("Todo deleted successfully!");
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoToDelete._id));
    } catch (error) {
      alert("Failed to delete todo: " + error.message);
    } finally {
      setShowDeleteModal(false);
      setTodoToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setTodoToDelete(null);
  };

  const handleAddTask = () => {
    setShowAddModal(true);
  };

  const handleProfileClick = () => {
    navigate("/todo");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center py-8 px-4">
      {/* Header Buttons: Profile & Add Task */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
        <div className="flex space-x-4">
          <button
            onClick={handleProfileClick}
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-md"
          >
            <i className="fas fa-user"></i> Profile
          </button>
          <button
            onClick={handleAddTask}
            className="py-2 px-6 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all shadow-md"
          >
            Add Task
          </button>
        </div>
      </div>

      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Consistency is the Key</h2>

      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Your Tasks ✔️</h3>
        <ul className="space-y-4">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <li
                key={todo._id}
                onClick={() => seeContributions(todo)}
                className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-all cursor-pointer shadow-sm"
              >
                <span className="text-lg font-medium text-gray-800">{todo.taskName || "Unnamed Task"}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{todo.streak || 0} 🔥</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteConfirmation(todo);
                    }}
                    className="flex items-center space-x-1 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-full transition-all shadow"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v2H8V5a2 2 0 012-2z" />
                    </svg>
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500">No tasks found!</li>
          )}
        </ul>
      </div>

      {/* Modal for Existing Task / Contribution */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">{task?.taskName}</h3>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your update"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSave}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
              >
                Save
              </button>
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding New Task */}
      {showAddModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Add New Task</h3>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter task name"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSave}
                className="py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all shadow-md"
              >
                Add Task
              </button>
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{todoToDelete?.taskName}</span>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDeleteConfirm}
                className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-md"
              >
                Delete
              </button>
              <button
                onClick={handleDeleteCancel}
                className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all shadow-md"
              >
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
