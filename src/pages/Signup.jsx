import React, { useState } from 'react'
import Card from '../components/Card'
import InputField from '../components/InputField'
import { NavLink } from 'react-router-dom'

const Signup = () => {
    const [firstName, setfirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [PhoneNumber, setphoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [password, setPassword] = useState('');
     const [showPassword,, setShowPassword] = useState(false); 
    return (
        <>
            <div className="main-bx d-flex justify-content-center align-items-center vh-100 ">
                <div className="container text-center ">
                    <div className="row login-input">
                        <div className="col-md-6">
                            <Card title='Sign up'>
                                <div className="form-floating mb-3">
                                    <InputField
                                        type="text"
                                        value={firstName}
                                        //   placeholder="Enter username or password"
                                        className="mb-3"
                                        onChange={(e) => {
                                            setfirstName(e.target.value);
                                            setErrors((prev) => ({ ...prev, firstName: '' }));
                                        }}
                                    />

                                    <label htmlFor="email">First Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <InputField
                                        type="text"
                                        value={lastName}
                                        //   placeholder="Enter username or password"
                                        className="mb-3"
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                            setErrors((prev) => ({ ...prev, lastName: '' }));
                                        }}
                                    />

                                    <label htmlFor="lastName">Last Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <InputField
                                        type="text"
                                        value={email}
                                        //   placeholder="Enter username or password"
                                        className="mb-3"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setErrors((prev) => ({ ...prev, email: '' }));
                                        }}
                                    />

                                    <label htmlFor="email">email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <InputField
                                        type="text"
                                        value={PhoneNumber}
                                        //   placeholder="Enter username or password"
                                        className="mb-3"
                                        onChange={(e) => {
                                            setphoneNumber(e.target.value);
                                            setErrors((prev) => ({ ...prev, PhoneNumber: '' }));
                                        }}
                                    />

                                    <label htmlFor="phoneNumber">Phone number</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <InputField
                                        type="text"
                                        value={password}
                                        //   placeholder="Enter username or password"
                                        className="mb-3"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setErrors((prev) => ({ ...prev, password: '' }));
                                        }}
                                    />

                                    <label htmlFor="password">password</label>
                                      <span
                                    className="view-password"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                                    </span>
                                </div>
                                <div className="form-floating mb-3">
                                    <InputField
                                        type="text"
                                        value={confirmPassword}
                                        //   placeholder="Enter username or password"
                                        className="mb-3"
                                        onChange={(e) => {
                                            setconfirmPassword(e.target.value);
                                            setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                                        }}
                                    />

                                    <label htmlFor="confirmPassword">Confirm password</label>
                                      <span
                                    className="view-password"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                                    </span>
                                </div>
                                  <div className="d-flex justify-content-center align-items-center mt-3">
                                    <button className="btn btn-primary mb-2" >Signup</button>
                                </div>
                                
                            </Card>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup