// api.js

const BASE_URL = 'http://localhost:3000';

export const fetchUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/users`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
        throw error;
    }
};

export const addUser = async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
        throw error;
    }
};

export const updateUser = async (id, formData) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Check if the response body is empty before parsing it as JSON
        const text = await response.text();
        return text ? JSON.parse(text) : {};
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
        throw error;
    }
};


export const fetchManagerAndEmployees = async (managerName) => {
    try {
        const response = await fetch(`${BASE_URL}/manager/${managerName}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
        throw error;
    }
};
