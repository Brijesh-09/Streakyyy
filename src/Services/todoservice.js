const API_URL = "https://streaky-backend.onrender.com/todo"; // Adjusted to match the backend API URL for todos

// Helper function to get the token from localStorage
const getAuthToken = () => {
    const token = localStorage.getItem('authToken'); // or wherever you store the token
    console.log('Token retrieved:', token);  // Log the token
    return token;
};

// Make the GET request for "getmy" route
export const getTodos = async () => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("Authentication token is missing");
    }

    const response = await fetch(`${API_URL}/getmy`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error fetching todos:", errorDetails);
        throw new Error("Failed to fetch todos");
    }

    const data = await response.json();

    // Check if data.todos is an array before returning
    if (Array.isArray(data.todos)) {
        return data.todos;
    } else {
        throw new Error("Invalid data structure: todos is not an array");
    }
};

// Make the POST request for "add" route
export const addTodo = async (newTask) => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Token not found');
        }

        console.log('New task data:', newTask);  // Log new task data to ensure it's correct

        const response = await fetch(`${API_URL}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newTask),
        });

        if (!response.ok) {
            const errorDetails = await response.json();  // Get error details
            console.error('Response error details:', errorDetails);
            throw new Error(`Failed to add new task, Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error adding new task:", error);
        throw error;  // Re-throw error to be handled by the calling function
    }
};

// Make the POST request for "addcontribution" route
export const addContribution = async (todoId, inputText) => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("Authentication token is missing");
    }

    const response = await fetch(`${API_URL}/addContribution/${todoId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contribution: inputText }),
    });

    if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error adding contribution:", errorDetails);
        throw new Error("Failed to add contribution");
    }

    return await response.json();
};

// Make the DELETE request for "del" route
export const deleteTodo = async (todoId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error("Authentication token is missing");
    }

    try {
        const response = await fetch(`${API_URL}/del/${todoId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            const text = await response.text();  // Debug response
            console.error("Error response:", text);
            throw new Error(`Failed to delete todo, Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error in deleteTodo:", error);
        throw error;
    }
};

