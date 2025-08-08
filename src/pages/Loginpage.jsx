import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import InputField from '../components/InputField'
import '../css/Loginpage.css'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
// import jwt from 'JsonWebToken'

const Loginpage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [errors, setErrors] = useState({ username: '', password: '' });

    const handleLogin = async() => {
        if (!username || !password) {
            setErrors({
                username: !username ? 'Username is required' : '',
                password: !password ? 'Password is required' : '',
            });
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/users`);
            const users = await response.json();

            const user = users.find((u) =>
            (u.email === username || u.phoneNumber === username || u.name === username) &&
            u.password === password
            );

            if (user) {
            // Save to session
            sessionStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('user', JSON.stringify(user));
              if(user.role === 'admin'){
                navigate('/dashboard');

              }
              else if(user.role === 'user'){
                navigate('/user-dashboard');
              }
            } else {
            setErrors({
                username: 'Invalid email/phone/username or password',
                password: 'Invalid password',
            });
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrors({
            username: 'Something went wrong. Please try again.',
            password: '',
            });
        }
    };


    useEffect(() => {
        const users = sessionStorage.getItem('user');
        if (users){
             const parsed = JSON.parse(users);
        setUsername(parsed.email || '');
        setPassword(parsed.password || '');

        }
    }, [])

    return (
        <>
            <div className="main-bx pagebody d-flex justify-content-center align-items-center vh-100 "> 
                <div className="container text-center ">
                    <div className="row login-input">
                        <div className="col-md-5">
                            <Card title="Login" extraClass='px-5 py-4 rounded-4 login-bx'>
                                <div className="line1"></div>
                                
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
                                    {/* <button className="btn btn-primary mb-2" onClick={handleLogin}>Login</button> */}

                                    <Button 

                                    onClick={handleLogin}
                                    variant='primary'
                                    className='w-100 mt-3 mb-3'
                                    size='lg'
                                    label='Login'

                                    
                                    ></Button>
                                    
                                </div>
                                <span className="text-center">or</span>
                               

                                <p className='mt-2'>
                                    <span className='small-text'>UserName : test@gmail.com</span> <br />
                                   <span className='small-text'>Password : 123456</span> 

                                </p>

                                <div className="create-account">
                                    You don't have an account? 
                                    <NavLink
                                        to='/signup' className='ms-2 account small-text text-white'
                                    >
                                        Create new
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
