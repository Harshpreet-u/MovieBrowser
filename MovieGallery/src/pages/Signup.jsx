import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//import "../css/Signup.css";
import { useState } from "react";
import { handleError, handleSuccess } from "../../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("All fields are necessary");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      console.log(result);
      const {success, message, error} = result;
      if(success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login')
        }, 1000);
      } else if(error) {
        const details = error?.details[0];
        handleError(details);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  return (
    <div className="container">
      <h1 className="loginSignup-head">SignUp</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your Name"
            value={signupInfo.name}
          />
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            autoFocus
            placeholder="Enter your Email"
            value={signupInfo.email}
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            autoFocus
            placeholder="Enter your Password"
            value={signupInfo.password}
          />
        </div>
        <button className="loginSignup-btn">Signup</button>
        <span>
          Already have an account?
          <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
