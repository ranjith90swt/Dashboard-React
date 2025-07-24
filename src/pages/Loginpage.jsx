import React, { useState } from 'react'
import Card from '../components/Card'
import InputField from '../components/InputField'
import '../css/Loginpage.css'
import { useNavigate } from 'react-router-dom'

const Loginpage = () => {
 const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
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

    navigate('/dashboard');
  };
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
                {errors.username && (
                  <p className="text-danger">{errors.username}</p>
                )}
                  <label htmlFor="email">Email or phone</label>
            </div>
            <div className="form-floating mb-3">
                 <InputField
                  type="password"
                  value={password}
                  placeholder="Enter password"
                  className="mb-3"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                />
                {errors.username && (
                  <p className="text-danger">{errors.password}</p>
                )}
                                  <label htmlFor="password">Password</label>

                </div>

                  <div className="d-flex justify-content-center align-items-center mt-3">
                <button className="btn btn-primary mb-2" disabled={!username || !password} onClick={handleLogin}>Login</button>
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
