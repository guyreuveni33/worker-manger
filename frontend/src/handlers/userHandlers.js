// handlers/handlers.js

import { fetchUsers, addUser, updateUser, deleteUser, fetchManagerAndEmployees } from '../api/api';

export const fetchUsersData = async (setUsers) => {
    try {
        const data = await fetchUsers();
        setUsers(data);
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }
};

export const handleInputChange = (e, formData, setFormData) => {
    const { name, value } = e.target;
    if ((name === 'firstName' || name === 'lastName' || name === 'manager') && /\d/.test(value)) {
        alert('Names cannot contain numbers');
        return;
    }

    setFormData(prevState => ({
        ...prevState,
        [name]: (name === 'firstName' || name === 'lastName' || name === 'manager') ? capitalizeFirstLetter(value) : value,
    }));
};

export const handleAddUser = async (e, formData, fetchUsersData, toggleModal, setFormData) => {
    e.preventDefault();
    try {
        await addUser(formData);
        fetchUsersData();
        setFormData({
            firstName: '',
            lastName: '',
            dateStarted: '',
            email: '',
            role: '',
            salary: '',
            manager: ''
        });
        toggleModal();
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }
};

export const handleEditUser = async (e, currentUserId, formData, fetchUsersData, toggleModal, setFormData) => {
    e.preventDefault();
    try {
        await updateUser(currentUserId, { ...formData, manager: undefined });
        fetchUsersData();
        setFormData({
            firstName: '',
            lastName: '',
            dateStarted: '',
            email: '',
            role: '',
            salary: '',
            manager: ''
        });
        toggleModal();
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }
};

export const handleEdit = (user, setFormData, setCurrentUserId, setIsEditing, toggleModal) => {
    setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        dateStarted: user.dateStarted,
        email: user.email,
        role: user.role,
        salary: user.salary,
        manager: user.manager,
    });
    setCurrentUserId(user._id);
    setIsEditing(true);
    toggleModal();
};

export const handleDelete = async (id, fetchUsersData) => {
    try {
        await deleteUser(id);
        fetchUsersData();
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }
};

export const handleFetchManagerAndEmployees = async (managerName) => {
    try {
        const data = await fetchManagerAndEmployees(managerName);
        console.log('Manager and Employees:', data);
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const handleSort = (key, sortConfig, setSortConfig) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
    }
    setSortConfig({ key, direction });
};

export const sortUsers = (users, sortConfig) => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
        sortableUsers.sort((a, b) => {
            if (sortConfig.key === 'dateStarted') {
                return sortConfig.direction === 'ascending'
                    ? new Date(a[sortConfig.key]) - new Date(b[sortConfig.key])
                    : new Date(b[sortConfig.key]) - new Date(a[sortConfig.key]);
            } else {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            }
        });
    }
    return sortableUsers;
};
