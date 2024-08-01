// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../redux/authSlice";
// import "./LoginPopup.css";
//
// const LoginPopup = ({ onClose }) => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const dispatch = useDispatch();
//     const { user, loading, error } = useSelector((state) => state.auth);
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(loginUser({ email, password }));
//     };
//
//     // Close popup if login is successful
//     useEffect(() => {
//         if (user) {
//             onClose();
//         }
//     }, [user, onClose]);
//
//     return (
//         <div className="login-popup">
//             <div className="login-popup-content">
//                 <button className="close-button" onClick={onClose}>
//                     &times;
//                 </button>
//                 <h2>Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label>Email:</label>
//                         <input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Password:</label>
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button type="submit" disabled={loading}>
//                         {loading ? "Logging in..." : "Login"}
//                     </button>
//                     {error && <p className="error">{error}</p>}
//                 </form>
//             </div>
//         </div>
//     );
// };
//
// export default LoginPopup;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import "./LoginPopup.css";

const LoginPopup = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    // Close popup if login is successful
    useEffect(() => {
        if (user) {
            setLoginSuccess(true);
            setTimeout(() => {
                setLoginSuccess(false);
                onClose();
            }, 2000); // Close the popup after 2 seconds
        }
    }, [user, onClose]);

    return (
        <div className="login-popup">
            <div className="login-popup-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    {error && <p className="error">{error}</p>}
                    {loginSuccess && <p className="success">Login successful!</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginPopup;


