// UserList.js
import React, { useContext } from 'react';
import './UserList.css';
import { AuthContext } from './App';

const UserList = ({ users }) => {
    const authContext = useContext(AuthContext);
    console.log(authContext); // Sprawdź, co jest zwracane przez useContext
    const { loginUser, authenticatedUser } = authContext;

    const handleLogin = (userId) => {
        loginUser(userId);
    };

    return (
        <div className="user-list-container">
            <ul className="user-list">
                {users.map((user) => (
                    <li key={user.id} className="user-item">
                        <strong>ID:</strong>{user.id} <strong>Imię:</strong>{user.name} <strong>Email:</strong>{user.email} <strong>Rola:</strong>{user.role}

                        {/* Warunek renderowania przycisku Zaloguj */}
                        {!authenticatedUser && (
                            <button onClick={() => handleLogin(user.id)}>Zaloguj</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
