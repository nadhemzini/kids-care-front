import React, { SyntheticEvent, useState } from 'react'
import { login } from '../services/ServicesAdmin';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Enseignants from './Enseignants';

function Login() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>('admin');
  console.log(selectedOption);
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handlelogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await login(email, password, selectedOption);
      toast.success("Login successful");
      console.log('Login successful:');
      console.log(localStorage.getItem("token"));
      if (selectedOption === "enseignant") {
        window.location.href = "/getion-Homework";
      } else {
        window.location.href = "/dashboard";
      }

    } catch (error: any) {
      toast.error('Login failed');
    }

  };

  return (
    <div className=" container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner mt-5">
          <Row className="justify-content-center align-items-center h-100 ">
            <Col xs={12} md={6}>
              {/* Register */}
              <div className="card centered-div">
                <div className="card-body">
                  {/* Logo */}
                  <div className="app-brand justify-content-center">
                    <a href="/" className="app-brand-link gap-2">
                      <img
                        src="/assets/img/avatars/Image1.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Logo"
                      />
                      <span className="app-brand-text demo text-body fw-bolder">KidsCare</span>
                    </a>
                  </div>
                  {/* /Logo */}
                  <h4 className="mb-2">Welcome to KidsCare! 👋</h4>
                  <form onSubmit={handlelogin} id="formAuthentication" className="mb-3" >
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email or Username</label>
                      <input type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" name="email-username" />
                    </div>
                    <div className="mb-3 form-password-toggle">
                      <div className="d-flex justify-content-between">
                        <label className="form-label" htmlFor="password">Password</label>

                      </div>
                      <div className="input-group input-group-merge">
                        <input
                          type='password'
                          placeholder="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)} id="password" className="form-control" name="password" aria-describedby="password" />
                        <span className="input-group-text cursor-pointer"><i className="bx bx-hide" /></span>
                      </div>
                    </div>


                    <div className='mb-3 d-flex justify-content-center'>
                      <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input onChange={handleOptionChange} value="admin" type="radio" className="btn-check" name="btnradio" id="btnradio1" defaultChecked autoComplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="btnradio1">Admin </label>
                        <input onChange={handleOptionChange} value="enseignant" type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="btnradio2">Enseignant </label>

                      </div>
                    </div>
                    <div className="mb-3">
                      <button onClick={handlelogin} className="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                    </div>
                  </form>

                </div>
              </div>
              {/* /Register */}
            </Col>
          </Row>

        </div>
      </div>
    </div>


  )
}


export default Login