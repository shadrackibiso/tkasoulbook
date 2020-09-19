import React, { useState } from "react";
import "../css/logIn.css";
import logo from "../icons/logo.svg";
import { NavLink } from "react-router-dom";
import AlertBox from "../components/AlertBox";
import fb from "../config/config";

function LogIn(props) {
  const [uploading, setUploading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const logIn = (e) => {
    e.preventDefault();
    const form = document.querySelector("form.logInForm");
    fb.auth()
      .signInWithEmailAndPassword(form.email.value, form.password.value)
      .then(() => props.checkData())
      .catch((error) => {
        console.log(error);
        setUploading(true);
        setAlertMessage(error.message);
        setTimeout(() => setUploading(false), 5000);
      });
  };

  return (
    <div className="logInPage">
      <div style={{ display: !uploading && "none" }}>
        <AlertBox message={alertMessage} />
      </div>
      <div className="logInSideLabel">
        <img src={logo} className="logInLogo" width="30%" alt="logo" />
      </div>
      <div className="logInFormContainer">
        <div className="logInLabel">Soulbook</div>
        <form className="logInForm" onSubmit={logIn}>
          <div className="logInInputLabel">email</div>
          <input type="email" name="email" className="logInInputBox" required />
          <div className="logInInputLabel">password</div>
          <input
            type="password"
            name="password"
            className="logInInputBox"
            required
          />
          <button className="logInButton">LOGIN</button>
        </form>
        <div className="logInSignUpWrap">
          <div>Don't have an account?</div>
          <NavLink to="/signUp">
            <button className="SignUpButton">SIGN UP</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
