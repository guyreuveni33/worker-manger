import { useState } from 'react';

export const useUserManagement = () => {
    const today = new Date().toISOString().split('T')[0];

    const [users, setUsers] = useState([]);
    const [shown, setShown] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateStarted: today,
        email: '',
        role: '',
        salary: '',
        manager: ''
    });
    const [roleFilter, setRoleFilter] = useState('');

    const resetFormData = () => {
        setFormData({
            firstName: '',
            lastName: '',
            dateStarted: today,
            email: '',
            role: '',
            salary: '',
            manager: ''
        });
    };

    return {
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
    };
};
