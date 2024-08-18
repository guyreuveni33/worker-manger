import React from 'react';
import './UserTable.css';

function UserTable({ sortedUsers, requestSort, handleEdit, handleDelete }) {
    return (
        <div className="table-container">
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
                        <td>{new Date(user.dateStarted).toISOString().split('T')[0]}</td>
                        <td>{user.role}</td>
                        <td className="salary-cell">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(user.salary)}</td>
                        <td>{user.manager}</td>
                        <td>
                            <button
                                onClick={() => handleEdit(user)}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(user._id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
