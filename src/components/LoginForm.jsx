import React, { useState } from "react";
import { Link } from "react-router-dom";

export function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "username",
      "password",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        setErrorMessage("Please fill in all required fields.");
        return false;
      }
    }

    setErrorMessage("");
    return true;
  }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
        try {
          const response = await fetch( "http://localhost:3000/api/users/login" , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log("Registration successful:");
            localStorage.setItem("user_nt1", JSON.stringify(data.user))
          } else {
            const errorData = await response.json();
            console.log(errorData);
            
            setErrorMessage(errorData.msg || "Registration failed. Please try again.");
          }
        } catch (error) {
          console.error("Error during registration:", error);
          setErrorMessage("An error occurred. Please try again later.");
        }
      } else {
        console.log(errorMessage);
      }
    }
  return (
    <div className="login-form-container">
      <div className="login-form">
        <p className="title">Welcome back</p>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="Email or Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <p className="page-link">
            <span className="page-link-label">Forgot Password?</span>
          </p>
          <button type="submit" className="form-btn">
            Log in
          </button>
        </form>
        <p className="sign-up-label">
          Don't have an account?
          <Link to="/sign-up" className="sign-up-link">
            {" "}
            Sign up
          </Link>
        </p>
        <div className="buttons-container">
          <div className="google-login-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="15"
              height="15"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span>Log in with Google</span>
          </div>
        </div>
      </div>
    </div>
  );
}
