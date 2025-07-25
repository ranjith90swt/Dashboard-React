import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import InputField from '../components/InputField'
import '../css/Loginpage.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { use } from 'react'
// import jwt from 'JsonWebToken'

const Loginpage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [errors, setErrors] = useState({ username: '', password: '' });

    const handleLogin = () => {
        if (!username || !password) {
            setErrors({
                username: !username ? 'Username is required' : '',
                password: !password ? 'Password is required' : '',
            });
            return;
        }

        const userData = JSON.parse(sessionStorage.getItem('user'));

        if (userData) {
            const { email,userName, phoneNumber, password: storedPassword } = userData;

            const isValidUser =
                (username.trim() === email || username.trim() === phoneNumber || username.trim() === userName) &&
                password.trim() === storedPassword ;

            if (isValidUser) {
                navigate('/dashboard');
            } else {
                setErrors({
                    username: 'Invalid email/phone or password',
                    password: 'Invalid password',
                });
            }
        } else {
            setErrors({
                username: 'User name is required',
                password: 'Password is required',
            });
        }
    };


    useEffect(() => {
        const users = sessionStorage.getItem('user');
    })
    return (
        <>
            <div className="main-bx d-flex justify-content-center align-items-center vh-100 ">
                <div className="container text-center ">
                    <div className="row login-input">
                        <div className="col-md-6 ">
                            <Card title="Login">

                                {/* <div className="col-md-6 text-center login-image">
                <img
                  src={pattern}
                  alt="No file is available"
                  className="img-fluid"
                />
              </div> */}
                                <div className="form-floating mb-3">
                                    <InputField
                                        type="text"
                                        value={username}
                                        //   placeholder="Enter username or password"
                                        className="mb-3"
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                            setErrors((prev) => ({ ...prev, username: '' }));
                                        }}
                                    />

                                    <label htmlFor="email">Email or phone</label>
                                </div>
                                {errors.username && (
                                    <span className="text-danger small-text">{errors.username}</span>
                                )}
                                <div className="form-floating mb-3">
                                    <InputField
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        placeholder="Enter password"
                                        className="mb-3"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setErrors((prev) => ({ ...prev, password: '' }));
                                        }}

                                    />
                                    <label htmlFor="password">Password</label>
                                    <span
                                        className="view-password"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                                    </span>
                                </div>
                                {errors.password && (
                                    <span className="text-danger small-text">{errors.password}</span>
                                )}
                                <div className="d-flex justify-content-center align-items-center mt-3">
                                    <button className="btn btn-primary mb-2" onClick={handleLogin}>Login</button>
                                    
                                </div>
                                <span className="text-center">or</span>
                                <div className="create-account">
                                    <NavLink
                                        to='/signup' className='account'
                                    >
                                        create new
                                    </NavLink>
                                </div>
                            </Card>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Loginpage
