import React, {useEffect} from 'react';
import './App.css';
import Modal from './components/modal';
import Header from './components/header';
import UserTable from './components/UserTable';
import {useUserManagement} from './hooks/useUserManagement'; // Import your custom hook
import {fetchUsersData, handleAddUser, handleDelete, handleEditUser, handleInputChange} from './handlers/userHandlers';

function App() {
    const {
        today,
        users,
        setUsers,
        shown,
        setShown,
        isEditing,
        setIsEditing,
        currentUserId,
        setCurrentUserId,
        sortConfig,
        setSortConfig,
        formData,
        setFormData,
        roleFilter,
        setRoleFilter,
        resetFormData
    } = useUserManagement(); // Use the custom hook

    const toggleModal = () => {
        setShown(prev => !prev);
        if (!shown) {
            resetFormData();
            setIsEditing(false);
        }
    };

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

    const filteredUsers = React.useMemo(() => {
        return users.filter(user => {
            return roleFilter ? user.role === roleFilter : true;
        });
    }, [users, roleFilter]);

    const sortedUsers = React.useMemo(() => {
        let sortableUsers = [...filteredUsers];
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
    }, [filteredUsers, sortConfig]);

    const handleEdit = (user) => {
        setIsEditing(true);
        setCurrentUserId(user._id);
        setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            dateStarted: new Date(user.dateStarted).toISOString().split('T')[0],
            email: user.email,
            role: user.role,
            salary: user.salary,
            manager: user.manager
        });
        setShown(true);
    };

    return (
        <div className="App">
            <Header/>
            <div id="content">
                <div className="actions-container">
                    <div className="filter-container">
                        <select className="rolesfiltertext" value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}>
                            <option value="">All Roles</option>
                            <option value="Manager">Manager</option>
                            <option value="Worker">Worker</option>
                            <option value="Driver">Driver</option>
                        </select>
                    </div>

                    <button className="button" onClick={() => toggleModal()}>
                        Add User
                    </button>
                </div>

                <UserTable
                    sortedUsers={sortedUsers}
                    requestSort={requestSort}
                    handleEdit={handleEdit}
                    handleDelete={(userId) => handleDelete(userId, () => fetchUsersData(setUsers))}
                />

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
            </div>
        </div>
    );
}

export default App;
