import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



import styles from "./signup.module.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import signup from '../../api/signup';

const SignupPage = () => {

    let [responseMessage, setResponseMessage] = useState('');
    let [responseType, setResponseType] = useState('');

    let [usertype, setUsertype] = useState("user");
    let [name, setName] = useState("");
    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [phone, setPhone] = useState("");

    let [password, setPassword] = useState("");
    let [showpw, setShowpw] = useState(false);



    const setShowPassword = (e) => {
        showpw ? setShowpw(false) : setShowpw(true);
    }


    const handleUsertype = (e) => {
        setUsertype(e.target.value);
    }


    const handleSignup = async (e) => {
        e.preventDefault();
        // console.log(usertype,name,username,email,phone,password,showpw);


        let userdata = {
            usertype,
            name,
            username,
            email,
            phone,
            password,
        }

        try {
            let res = await signup(userdata);
            console.log(res.data);
            setResponseType("success");
            setResponseMessage(res.data.success);

            setName("");
            setUsername("");
            setEmail("");
            setPassword("");
            setPhone("");
            e.target.reset();


        } catch (err) {
            console.log(err.response.data);
            setResponseType("error");
            setResponseMessage(err.response.data.error);
        }



    }




    useEffect(() => {
        // console.log(usertype,name,username,email,phone,password,showpw)
    })


    return (
        <>
            {/* <Navbar name="" is_logged_in={false} error={""} usertype={"unknown"} /> */}


            <Container className="d-flex justify-content-center flex-column" style={{height:"90vh"}}>

                <Row>


                    <Col sm={0} md={6} className={styles.main}>
                        <h1 className={styles.heading}>E-COMMERCE</h1>
                        <h1 className={styles.head}>Signup</h1>
                    </Col>
                    <Col sm={12} md={6} className={styles.formcontainer}>

                        <form className={styles.form} onSubmit={handleSignup}>
                            <div className="d-flex justify-content-around">
                                <span>
                                    <input className="form-check-input" style={{ marginRight: "10px" }} type="radio" name="usertype" id="user" value="user" defaultChecked onClick={handleUsertype} />
                                    <label className="form-check-label" htmlFor="user">User Account</label>
                                </span>

                                <span>
                                    <input className="form-check-input" style={{ marginRight: "10px" }} type="radio" name="usertype" id="seller" value="seller" onClick={handleUsertype} />
                                    <label className="form-check-label" htmlFor="seller">Seller Account</label>
                                </span>

                            </div>

                            <input type="text" className={styles.input} placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} required />

                            <input type="text" className={styles.input} placeholder="Username" value={username} onChange={(e) => { setUsername(e.target.value) }} required />

                            <input type="email" className={styles.input} placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} required />

                            <input type="number" className={styles.input} placeholder="Phone No." value={phone} onChange={(e) => { setPhone(e.target.value) }} required />

                            <input type={showpw ? "text" : "password"} className={styles.input} placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />


                            <div className="d-flex justify-content-center">
                                <input style={{ marginRight: "10px" }} type="checkbox" id="showpw" onClick={setShowPassword} />
                                <label htmlFor="showpw">Show Password</label>
                            </div>

                            {responseMessage ? <div className={responseType == 'success' ? styles.success : styles.error}>{responseMessage}</div> : <div></div>}


                            <button type="submit" className={styles.submit} >Sign Up</button>
                        </form>

                        <Link to="/login">
                            <div className={styles.buttons}>
                                <button className="btn btn-warning">Already a user? Login</button>
                            </div>
                        </Link>


                    </Col>


                </Row>


            </Container>

        




        </>


    )

}


export default SignupPage;