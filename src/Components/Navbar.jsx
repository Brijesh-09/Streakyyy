import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../Services/authservice'

const Navbar = () => {
  const [modalType, setModalType] = useState(''); // 'signup' or 'signin'
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'signup') {
        await authService.signUp(formData);
        alert('Sign-up successful! You can now sign in.');
      } else if (modalType === 'signin') {
        await authService.signIn(formData);
        alert('Sign-in successful!');
        navigate('/todo_2'); // Navigate to the protected route
      }
      setModalType(''); // Close the modal
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-row sm:flex-row justify-between p-2 bg-gray-100">
      <div className="text-3xl text-gray-600 font-bold m-2 text-center sm:text-left pl-20">Streaky 🔥</div>
      <div className="flex gap-4 pr-20">
        <button
          className="text-xl m-1 font-semibold border-2 p-2  cursor-pointer"
          onClick={() => setModalType('signup')}
        >
          Sign Up
        </button>
        <button
          className="text-xl m-1 font-semibold border-2 p-2 bg-orange-400 cursor-pointer"
          onClick={() => setModalType('signin')}
        >
          Sign In
        </button>
      </div>

      {/* Modal */}
      {modalType && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl mb-4">{modalType === 'signup' ? 'Sign Up' : 'Sign In'}</h2>
            <form onSubmit={handleSubmit}>
              {modalType === 'signup' && (
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="p-2 border border-gray-300 rounded w-full"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="mb-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="p-2 border border-gray-300 rounded w-full"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="p-2 border border-gray-300 rounded w-full"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
              >
                {modalType === 'signup' ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
            <button
              className="mt-4 p-2 bg-red-500 text-white rounded w-full"
              onClick={() => setModalType('')}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
