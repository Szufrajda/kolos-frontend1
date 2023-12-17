// App.js
import React, { createContext, useState, useRef, useEffect } from 'react';
import UserList from './UserList';

export const AuthContext = createContext();

const App = () => {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const searchInputRef = useRef();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('./users.json')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const loginUser = (userId) => {
        const user = users.find(user => user.id === userId);
        setAuthenticatedUser(user);
    };

    const logoutUser = () => {
        setAuthenticatedUser(null);
    };

    const handleSearch = () => {
        setSearchTerm(searchInputRef.current.value.toLowerCase());
    };

    const contextValue = {
        loginUser,
        logoutUser,
        authenticatedUser,
    };

    const filteredUsers = users.filter(user => (
        (!filterRole || user.role === filterRole) &&
        (!searchTerm || user.name.toLowerCase().includes(searchTerm))
    ));

    return (
        <AuthContext.Provider value={contextValue}>
            <div>
                <h1>Lista Użytkowników</h1>
                {authenticatedUser && (
                    <div>
                        <p>Zalogowany: {authenticatedUser.name}</p>
                        <button onClick={logoutUser}>Wyloguj</button>
                    </div>
                )}
                <div>
                    <label>
                        Wyszukaj użytkownika:{' '}
                        <input
                            type="text"
                            ref={searchInputRef}
                            onChange={handleSearch}
                        />
                    </label>
                </div>
                <button onClick={() => setFilterRole('admin')}>Filtruj Administratorów</button>
                <button onClick={() => setFilterRole('user')}>Filtruj Użytkowników</button>
                <button onClick={() => setFilterRole('')}>Pokaż Wszystkich</button>

                <UserList users={filteredUsers} />
            </div>
        </AuthContext.Provider>
    );
};

export default App;