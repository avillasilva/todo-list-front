import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import connectToAPI from './api/Bridge';

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

    // if (details.email == adminUser.email && details.password == adminUser.password) {
    //   console.log("Logged in")
    //   setUser( {
    //     name: details.name,
    //     email: details.email
    //   })
    // } else {
    //   console.log("Details do not match")
    //   setError("Details do not match")
    // }
  }

  const Logout = () => {
    setUser({name:""})
  }
  
  return (
    <div className="App">
      {(user.name != "") ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div> 
      ) : (
        <LoginForm Login={Login} error={error}/>
      )}
    </div>
  );
}

export default App;
