import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import {connectToAPI, registerToAPI} from './api/Bridge';
import Dashboard from './components/Dashboard';
import RegisterForm from './components/RegisterForm';

function App() {

  const [user, setUser] = useState({name:""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    connectToAPI(details.name, details.password).then((det) => {
      document._UserDetailsBridge = det;
      setUser(det);
    }).catch((err) => {
      console.log("Details do not match")
      setError("Details do not match")
    });
  }

  const Register = details => {
    registerToAPI(details.name, details.password, details.email).then((det) => {
      Login(details);
    }).catch((err) => {
      console.log("Details do not match")
      setError("Details do not match")
    });
  }

  const Logout = () => {
    setUser({name:""})
  }
  
  return (
    <div className="App">
      {(user.name != "") ? (
        <Dashboard/>
      ) : (
        <LoginForm Login={Login} error={error} Registrar={Register}/>
      )}
    </div>
  );
}

export default App;
