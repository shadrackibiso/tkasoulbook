import React, { useState } from "react";
import "../css/logIn.css";
import logo from "../icons/logo.svg";
import SignUpForm from "../components/SignUpForm";
import AlertBox from "../components/AlertBox";

function SignUp(props) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signUp = e => {
    e.preventDefault();
    const form = document.querySelector("form.logInForm");
    if (form.password.value.length < 6) {
      setAlertMessage("password must be more than 6 characters");
      setTimeout(() => setAlertMessage(null), 5000);
    } else if (form.password.value === form.password1.value) {
      setEmail(form.email.value);
      setPassword(form.password.value);
      setShowEditForm(true);
    } else {
      setAlertMessage("your passwords do not match");
      setTimeout(() => setAlertMessage(null), 5000);
    }
  };

  return (
    <div className="logInPage">
      <div style={{ display: !alertMessage && "none" }}>
        <AlertBox message={alertMessage} />
      </div>
      <div className="logInSideLabel">
        <img src={logo} className="logInLogo" width="30%" alt="logo" />
      </div>
      <div className="logInFormContainer">
        <div className="logInLabel">Sign Up</div>
        <form className="logInForm" onSubmit={signUp}>
          <div className="logInInputLabel">email</div>
          <input type="email" name="email" className="logInInputBox" required />
          <div className="logInInputLabel">password</div>
          <input
            type="password"
            name="password"
            className="logInInputBox"
            required
          />
          <div className="logInInputLabel">confirm password</div>
          <input
            type="password"
            name="password1"
            className="logInInputBox"
            required
          />
          <button className="logInButton">SIGN UP</button>
        </form>
      </div>
      <div
        className="profileEditFormWrap"
        style={{ display: !showEditForm && "none" }}
      >
        <SignUpForm
          {...props}
          closeForm={() => setShowEditForm(false)}
          email={email}
          password={password}
        />
      </div>
    </div>
  );
}

export default SignUp;
