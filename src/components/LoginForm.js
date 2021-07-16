import React, { useState } from 'react'
import RegisterForm from './RegisterForm';
import './Forms.css';

function LoginForm({ Login, error, Registrar }) {
    const [details, setDetails] = useState({ name: "", email: "", password: "" });
    const [register, setRegister] = useState(false);

    const submitHandler = e => {
        e.preventDefault();

        Login(details);
    }

    return (
        <div className="div-form-login">
            {(register) ? (
                <RegisterForm Registrar={Registrar} error={error} />
            ) : (
                <form onSubmit={submitHandler}>
                    <div className='form-inner form-login'>
                        <h2>Login</h2>
                        {error !== "" ? (<div className="error">{error}</div>) : ""}
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" name="name" id="name" onChange={e => setDetails({ ...details, name: e.target.value })} value={details.name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                        </div>
                        <div className="buttons">
                            <input type="submit" value="Login" />
                            <div className="reg-btn-div">
                            <label>No account? Please please register below:</label>
                                <input type="button" className="reg-btn" onClick={e => setRegister(true)} value="Register" />
                            </div>                            
                        </div>
                    </div>
                </form>
            )}
        </div>

    )
}

export default LoginForm;

