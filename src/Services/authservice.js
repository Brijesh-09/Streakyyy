const API_URL = 'https://streaky-backend.onrender.com/auth'; // Add 'http://' to ensure proper URL format

export const authService = {
  // Sign-Up API call
  signUp: async (formData) => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to sign up.');
      }

      return await response.json(); // Return the data from the server
    } catch (error) {
      console.error('Error during sign-up:', error.message);
      throw error;
    }
  },

  // Sign-In API call
  signIn: async (formData) => {
    try {
      const response = await fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to sign in.');
      }

      const data = await response.json();
      const { token } = data; // Assuming the backend sends { token: 'jwt_token_here' }
      localStorage.setItem('authToken', token); // Store JWT token
      return data; // Return data for further use
    } catch (error) {
      console.error('Error during sign-in:', error.message);
      throw error;
    }
  },
};
