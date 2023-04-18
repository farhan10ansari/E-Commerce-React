import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import login from "../../api/login";
import styles from "./forgetpassword.module.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const LoginPage = ({ setIsLoggedIn }) => {
  let [responseMessage, setResponseMessage] = useState("");
  let [responseType, setResponseType] = useState("");

  let [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let req = new XMLHttpRequest();
    req.open("POST", "http://localhost:3333/resetPassword");

    req.setRequestHeader("Content-Type", "application/json");

    let data = { email };
    req.addEventListener("load", function (res) {
      if (req.responseText == "success") {
        setResponseType("success");
        setResponseMessage("Password Reset Link Sent, Check Your Mail");
      } else {
        setResponseType("error");
        setResponseMessage(req.responseText);
      }

    });
    req.send(JSON.stringify(data));
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center flex-column"
        style={{ height: "90vh" }}
      >
        <Row className={styles.right}>
          <Col sm={0} md={6} className={styles.main}>
            <h1 className={styles.heading}>E-COMMERCE</h1>
            <h1 className={styles.head}>Forgot Password</h1>
          </Col>
          <Col sm={12} md={6} className={styles.formcontainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h1>Enter Your Email To Send Password Reset Link</h1>

              <input
                type="email"
                className={styles.input}
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />

              {responseMessage ? (
                <div
                  className={
                    responseType == "success" ? styles.success : styles.error
                  }
                >
                  {responseMessage}
                </div>
              ) : (
                <div></div>
              )}

              <button type="submit" className={styles.submit}>
                Submit
              </button>
            </form>

            <div className={styles.buttons}>
              <Link to="/login" className={styles.buttons}>
                <button className="btn btn-warning">Login</button>
              </Link>

              <Link to="/signup" className={styles.buttons}>
                <button className="btn btn-warning">Create New Account</button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
