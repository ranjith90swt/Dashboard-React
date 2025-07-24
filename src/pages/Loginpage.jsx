import React, { useState } from 'react'
import Card from '../components/Card'
import InputField from '../components/InputField'
import '../css/Loginpage.css'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
// import jwt from 'JsonWebToken'

const Loginpage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
     const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const [errors, setErrors] = useState({ username: '', password: '' });

    const handleLogin = () => {
        // Validate before proceeding
        if (!username || !password) {
          setErrors({
            username: !username ? 'Username is required' : '',
            password: !password ? 'Password is required' : '',
          });
          return;
        }
        // if (validations()) {
        //     navigate('/dashboard');

        // }
                    navigate('/dashboard');

    };
    const validations = () => {
        const errors = {};

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phonePattern = /^[6-9]\d{9}$/;

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!username) {
            errors.username = 'Username is required';
        } else if (!emailPattern.test(username) && !phonePattern.test(username)) {
            errors.username = 'Enter a valid email or phone number';
        }

        // if (!password) {
        //     errors.password = 'Password is required';
        // } else if (!passwordPattern.test(password)) {
        //     errors.password =
        //         'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
        // }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const togglepasswords = document.querySelector("#togglepassword");
    const passwords = document.querySelector("#password");

    const viewPassword = () => {


    };
    return (
        <>
            <div className="main-bx d-flex justify-content-center align-items-center vh-100 ">
                <div className="container text-center ">
                    <div className="row login-input">
                        <div className="col-md-6 ">
                            <Card 
                            title="Login" 
                              extraClass="mb-4 px-5 py-5"
                            >

                                {/* <div className="col-md-6 text-center login-image">
                <img
                  src={pattern}
                  alt="No file is available"
                  className="img-fluid"
                />
              </div> */}
                                <div className="form-floating mb-4 mt-3">
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

                                    {/* <span className="view-password d-none"><i class="bi bi-eye"></i></span>
                                    <span className="view-password"><i class="bi bi-eye-slash" id="togglepassword"></i></span> */}

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
                                    {/* <button className="btn btn-primary mb-2 py-3 w-100" onClick={handleLogin}>Login</button> */}
                                    <Button
                                     onClick= {handleLogin}
                                     className = 'w-100'
                                     variant = 'primary'
                                     size='lg'
                                     label='Login'
                                    >
                                        
                                    </Button>
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
