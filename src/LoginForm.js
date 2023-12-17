import React from 'react';
import { useAuth } from './AuthContext';

const LoginForm = ({ onLogin, users }) => {
    const { authenticatedUser } = useAuth();

    const handleLogin = (user) => {
        onLogin(user);
    };

    return (
        <div>
            <p>Nie jesteś zalogowany</p>
            {users.map(user => (
                <div key={user.id}>
                    <p>{user.name.first}</p>
                    <button onClick={() => handleLogin(user)} disabled={authenticatedUser !== null}>
                        Zaloguj jako {user.name.first}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default LoginForm;
