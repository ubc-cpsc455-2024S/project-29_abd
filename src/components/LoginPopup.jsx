// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../redux/authSlice";
// import { Input } from "./ui/input";
// import { Form } from "./ui/form";
// import { Button } from "./ui/button";
//
// const LoginPopup = ({ onClose }) => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const dispatch = useDispatch();
//     const { user, loading, error } = useSelector((state) => state.auth);
//     const [loginSuccess, setLoginSuccess] = useState(false);
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(loginUser({ email, password }));
//     };
//
//     // Close popup if login is successful
//     useEffect(() => {
//         if (user) {
//             setLoginSuccess(true);
//             setTimeout(() => {
//                 setLoginSuccess(false);
//                 onClose();
//             }, 2000); // Close the popup after 2 seconds
//         }
//     }, [user, onClose]);
//
//     return (
//         <div className="login-popup fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
//             <div className="login-popup-content bg-white p-6 rounded shadow-lg relative">
//                 <Button className="close-button absolute top-2 right-2" onClick={onClose}>
//                     &times;
//                 </Button>
//                 <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//                 <Form onSubmit={handleSubmit}>
//                     <div className="form-group mb-4">
//                         <label className="block text-sm font-medium text-gray-700">Email:</label>
//                         <Input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                         />
//                     </div>
//                     <div className="form-group mb-4">
//                         <label className="block text-sm font-medium text-gray-700">Password:</label>
//                         <Input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                         />
//                     </div>
//                     <Button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
//                         {loading ? "Logging in..." : "Login"}
//                     </Button>
//                     {error && <p className="text-red-500 mt-2">{error}</p>}
//                     {loginSuccess && <p className="text-green-500 mt-2">Login successful!</p>}
//                 </Form>
//             </div>
//         </div>
//     );
// };
//
// export default LoginPopup;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";
import { Input } from "./ui/input";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import './LoginPopup.css';

const LoginPopup = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error, successMessage } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login form submitted with email:", email);
        dispatch(loginUser({ email, password }));
    };

    // Close popup if login is successful
    // useEffect(() => {
    //     console.log("useEffect called with user:", user);
    //     if (successMessage) {
    //         setTimeout(() => {
    //             onClose();
    //         }, 2000); // Close the popup after 2 seconds
    //     }
    // }, [successMessage, onClose]);

    useEffect(() => {
        console.log("useEffect called with user:", user);
        if (user && user._id) {
            console.log("User state detected with ID:", user._id);
            setLoginSuccess(true);
            setTimeout(() => {
                setLoginSuccess(false);
                onClose();
                navigate('/profile')
            }, 2000); // Close the popup after 2 seconds
        }
    }, [user, onClose]);

    return (
        <div className="login-popup fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
            <div className="login-popup-content bg-white p-6 rounded shadow-lg relative">
                <Button className="close-button" onClick={onClose}>
                    &times;
                </Button>
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <Form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                </Form>
            </div>
        </div>
    );
};

export default LoginPopup;

