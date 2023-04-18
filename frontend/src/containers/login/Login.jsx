import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import login from '../../api/login' 
import styles from "./login.module.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const LoginPage = ({setUser,setIsLoggedIn,setIsPending}) => {

    const navigate=useNavigate();


    let [responseMessage,setResponseMessage]=useState('');


    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [showpw, setShowpw] = useState(false);



    const setShowPassword = (e) => {
        showpw ? setShowpw(false) : setShowpw(true);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        let userdata={
            username,
            password
        }
        
        try{
            let res=await login(userdata);
            // console.log(res.data);

            localStorage.setItem('accessToken',res.data.accessToken);
            localStorage.setItem('user',JSON.stringify(res.data.user));

            setIsLoggedIn(true);
            setIsPending(false);
            setUser(res.data.user);
            navigate('/');
            // location.reload();
            // setResponseMessage('');







        }catch(err)
        {
            console.log(err.response.data);
            setResponseMessage(err.response.data.error);
        }


    }




    return (
        <>
           

                <Container className="d-flex justify-content-center flex-column" style={{height:"90vh"}} >

                    <Row className={styles.right}>


                        <Col sm={0} md={6} className={styles.main}>
                            <h1 className={styles.heading}>E-COMMERCE</h1>
                            <h1 className={styles.head}>Login</h1>
                        </Col>
                        <Col sm={12} md={6} className={styles.formcontainer}>

                            <form className={styles.form} onSubmit={handleLogin}>
                                <input type="text" className={styles.input} placeholder="Username" value={username} onChange={(e) => { setUsername(e.target.value) }} required/>

                                <input type={showpw ? "text" : "password"} className={styles.input} placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }}  required/>

                                <div className="d-flex justify-content-center">
                                    <input style={{ marginRight: "10px" }} type="checkbox" id="showpw" onClick={setShowPassword} />
                                    <label htmlFor="showpw">Show Password</label>
                                </div>

                                {responseMessage && <div className={styles.error}>{responseMessage}</div>}

                                <button type="submit" className={styles.submit} >Log In</button>
                            </form>

                            <div className={styles.buttons}>
                                <Link to="/forgetPassword" className={styles.buttons}>
                                <button className="btn btn-link">Forgot Password</button>
                                </Link>

                                <Link to="/signup" className={styles.buttons}>
                                <button className="btn btn-warning">Create New Account</button>
                                </Link>
                            </div>


                        </Col>


                    </Row>


                </Container>


        </>

    )
}


export default LoginPage;