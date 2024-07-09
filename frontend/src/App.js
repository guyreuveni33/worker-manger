import React, {useState, useEffect} from 'react';
import './App.css';
import Modal from './components/modal';
import Header from './components/header';
import {
    fetchUsersData,
    handleInputChange,
    handleAddUser,
    handleEditUser,
    handleEdit,
    handleDelete,
    handleFetchManagerAndEmployees
} from './handlers/userHandlers';

function App() {
    const today = new Date().toISOString().split('T')[0];

    const [users, setUsers] = useState([]);
    const [shown, setShown] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [sortConfig, setSortConfig] = useState({key: null, direction: 'ascending'});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateStarted: today, // Set the default date to today
        email: '',
        role: '',
        salary: '',
        manager: ''
    });



    const toggleModal = () => setShown(prev => !prev);

    useEffect(() => {
        fetchUsersData(setUsers);
    }, []);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction});
    };

    const sortedUsers = React.useMemo(() => {
        let sortableUsers = [...users];
        if (sortConfig !== null) {
            sortableUsers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableUsers;
    }, [users, sortConfig]);

    return (
        <div className="App">
            <Header/>
            <div id="content">
                <div className="table-container">
                    <button onClick={() => {
                        setIsEditing(false);
                        toggleModal();
                    }}>Add User
                    </button>
                    <Modal displayModal={shown} closeModal={toggleModal}>
                        <h1 className="modalTitle">{isEditing ? 'Edit User' : 'Add New User'}</h1>
                        <form onSubmit={(e) => isEditing
                            ? handleEditUser(e, currentUserId, formData, () => fetchUsersData(setUsers), toggleModal, setFormData)
                            : handleAddUser(e, formData, () => fetchUsersData(setUsers), toggleModal, setFormData)}>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange(e, formData, setFormData)}
                                placeholder="First Name"
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange(e, formData, setFormData)}
                                placeholder="Last Name"
                            />
                            <input
                                type="date"
                                name="dateStarted"
                                value={formData.dateStarted}
                                onChange={(e) => handleInputChange(e, formData, setFormData)}
                                placeholder="Date Started"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange(e, formData, setFormData)}
                                placeholder="Email"
                            />
                            <select
                                name="role"
                                value={formData.role}
                                onChange={(e) => handleInputChange(e, formData, setFormData)}>
                                <option value="">Select Role</option>
                                <option value="Manager">Manager</option>
                                <option value="Worker">Worker</option>
                                <option value="Driver">Driver</option>
                            </select>
                            <input
                                type="number"
                                name="salary"
                                value={formData.salary}
                                onChange={(e) => handleInputChange(e, formData, setFormData)}
                                placeholder="Salary"
                            />
                            <input
                                type="text"
                                name="manager"
                                value={formData.manager}
                                onChange={(e) => handleInputChange(e, formData, setFormData)}
                                placeholder="Manager"
                                disabled={isEditing}
                            />
                            <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
                        </form>
                    </Modal>
                    <table>
                        <thead>
                        <tr>
                            <th className="sortable" onClick={() => requestSort('firstName')}>
                                First Name
                            </th>
                            <th className="sortable" onClick={() => requestSort('lastName')}>
                                Last Name
                            </th>
                            <th className="sortable" onClick={() => requestSort('email')}>
                                Email
                            </th>
                            <th className="sortable" onClick={() => requestSort('dateStarted')}>
                                Date Started
                            </th>
                            <th className="sortable" onClick={() => requestSort('role')}>
                                Role
                            </th>
                            <th className="sortable" onClick={() => requestSort('salary')}>
                                Salary
                            </th>
                            <th className="sortable" onClick={() => requestSort('manager')}>
                                Manager
                            </th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedUsers.map(user => (
                            <tr key={user._id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{new Date(user.dateStarted).toLocaleDateString()}</td>
                                <td>{user.role}</td>
                                <td>{new Intl.NumberFormat().format(user.salary)}$</td>
                                <td>{user.manager}</td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(user, setFormData, setCurrentUserId, setIsEditing, toggleModal)}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(user._id, () => fetchUsersData(setUsers))}>
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;
