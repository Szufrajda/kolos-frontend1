

import { useState, useEffect } from 'react';

const useUserFilter = (initialUsers, initialRole) => {
    const [users, setUsers] = useState(initialUsers);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [role, setRole] = useState(initialRole);

    useEffect(() => {
        // Filtruj użytkowników po roli, jeśli rola nie jest pusta
        if (role !== '') {
            const filtered = users.filter(user => user.role === role);
            setFilteredUsers(filtered);
        } else {
            // Jeśli rola jest pusta, pokaż wszystkich użytkowników
            setFilteredUsers(users);
        }
    }, [users, role]);

    // Funkcja do ustawiania roli
    const setFilterRole = newRole => {
        setRole(newRole);
    };

    return {
        filteredUsers,
        setUsers,
        setFilterRole,
    };
};

export default useUserFilter;
