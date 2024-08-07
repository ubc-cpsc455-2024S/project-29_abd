import React, { useState } from 'react';

const RegisterPopup = ({ onClose, onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        // Assume registration API call is successful
        const response = await registerApiCall(email, password);
        if (response.success) {
            onSuccess();
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Register</button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default RegisterPopup;
