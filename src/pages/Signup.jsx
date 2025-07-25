import React, { useState } from 'react';
import Card from '../components/Card';
import InputField from '../components/InputField';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [userName, setuserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSignup = () => {
        const fieldErrors = {
            userName: !userName ? 'user name is required' : '',
            firstName: !firstName ? 'First name is required' : '',
            lastName: !lastName ? 'Last name is required' : '',
            phoneNumber: !phoneNumber ? 'Phone number is required' : '',
            email: !email ? 'Email is required' : '',
            password: !password ? 'Password is required' : '',
            confirmPassword: !confirmPassword ? 'Please confirm password' : '',
        };

        setErrors(fieldErrors);

        // If any field is still empty, return
        if (Object.values(fieldErrors).some(Boolean)) return;

        if (!validations()) return;

        const compareError = comparePassword();
        if (compareError) {
            setErrors(prev => ({ ...prev, confirmPassword: compareError }));
            return;
        }

        const userData = {
            userName,
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            confirmPassword
        };
        sessionStorage.setItem('user', JSON.stringify(userData));

        navigate('/');
    };

    const validations = () => {
        const validationErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[6-9]\d{9}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!emailPattern.test(email)) {
            validationErrors.email = 'Invalid email format';
        }

        if (!phonePattern.test(phoneNumber)) {
            validationErrors.phoneNumber = 'Phone number must be 10 digits';
        }

        if (!passwordPattern.test(password)) {
            validationErrors.password =
                'Password must be 8+ characters and include uppercase, lowercase, number, and special character';
        }

        setErrors(prev => ({ ...prev, ...validationErrors }));
        return Object.keys(validationErrors).length === 0;
    };

    const comparePassword = () => {
        if (password !== confirmPassword) {
            return 'Passwords do not match';
        }
        return '';
    };

    return (
        <>
            <div className="main-bx d-flex justify-content-center align-items-center vh-100">
                <div className="container text-center">
                    <div className="row login-input">
                        <div className="col-md-6">
                            <Card title="Sign up">
                                {[
                                    {
                                        label: 'User Name',
                                        value: userName,
                                        setValue: setuserName,
                                        error: errors.userName,
                                        name: 'userName',
                                    },
                                    {
                                        label: 'First Name',
                                        value: firstName,
                                        setValue: setFirstName,
                                        error: errors.firstName,
                                        name: 'firstName',
                                    },
                                    {
                                        label: 'Last Name',
                                        value: lastName,
                                        setValue: setLastName,
                                        error: errors.lastName,
                                        name: 'lastName',
                                    },
                                    {
                                        label: 'Email',
                                        value: email,
                                        setValue: setEmail,
                                        error: errors.email,
                                        name: 'email',
                                    },
                                    {
                                        label: 'Phone Number',
                                        value: phoneNumber,
                                        setValue: setPhoneNumber,
                                        error: errors.phoneNumber,
                                        name: 'phoneNumber',
                                    },
                                    {
                                        label: 'Password',
                                        value: password,
                                        setValue: setPassword,
                                        error: errors.password,
                                        name: 'password',
                                        type: showPassword ? 'text' : 'password',
                                    },
                                    {
                                        label: 'Confirm Password',
                                        value: confirmPassword,
                                        setValue: setConfirmPassword,
                                        error: errors.confirmPassword,
                                        name: 'confirmPassword',
                                        type: showPassword ? 'text' : 'password',
                                    },

                                ].map((field, idx) => (
                                    <div className="form-floating mb-3" key={idx}>
                                        <InputField
                                            type={field.type || 'text'}
                                            value={field.value}
                                            className="mb-3"
                                            onChange={e => {
                                                field.setValue(e.target.value);
                                                setErrors(prev => ({ ...prev, [field.name]: '' }));
                                            }}
                                        />
                                        <label htmlFor={field.name}>{field.label}</label>
                                        {field.name.includes('password') && (
                                            <span
                                                className="view-password"
                                                onClick={() => setShowPassword(prev => !prev)}
                                            >
                                                <i
                                                    className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'
                                                        }`}
                                                ></i>
                                            </span>
                                        )}
                                        {field.error && (
                                            <p className="text-danger small-text">{field.error}</p>
                                        )}
                                    </div>
                                ))}

                                <div className="d-flex justify-content-center align-items-center mt-3">
                                    <button className="btn btn-primary mb-2" onClick={handleSignup}>
                                        Signup
                                    </button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
