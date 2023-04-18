import { useState } from "react";


import styles from "./changepassword.module.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




const changePasswordPage = ({user}) => {




    let [responseMessage, setResponseMessage] = useState('');
    let [responseType, setResponseType] = useState('');


    let [newPassword, setNewPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [showpw, setShowpw] = useState(false);



    const setShowPassword = (e) => {
        showpw ? setShowpw(false) : setShowpw(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        // console.log(newPassword,confirmPassword);
        // return;

        let token=localStorage.getItem("accessToken");

        fetch("http://localhost:3333/changePassword",{
            headers:{
                'Authorization':token,
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify({newPassword,confirmPassword})
        }).then((res)=>{
            // console.log(res);
            if(res.status==200)
            {
                return res.json();
            }
            else{
                throw res;
            }

        }).then((data)=>{
            console.log(data);
            setResponseType("success");
            setResponseMessage("Password Changed Successfully");
            setNewPassword("");
            setConfirmPassword("");
            return;
            


        }).catch(async (err)=>{
            console.log(err);
            let error=await err.json();
            console.log(error);
            setResponseType("error");
            setResponseMessage(error);
            

            

        })
        
    


    }




    return (
        <>
             

                <Container className="d-flex justify-content-center flex-column" style={{height:"90vh"}} >

                    <Row className={styles.right}>


                        <Col sm={0} md={6} className={styles.main}>
                            <h1 className={styles.heading}>E-COMMERCE</h1>
                            <h1 className={styles.head}>ChangePassword</h1>
                        </Col>
                        <Col sm={12} md={6} className={styles.formcontainer}>

                            <form className={styles.form} onSubmit={handleSubmit}>

                                <input type={showpw ? "text" : "password"} className={styles.input} placeholder="Password" value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }}  required/>
                                <input type="password" className={styles.input} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} required/>

                                <div className="d-flex justify-content-center">
                                    <input style={{ marginRight: "10px" }} type="checkbox" id="showpw" onClick={setShowPassword} />
                                    <label htmlFor="showpw">Show Password</label>
                                </div>

                                {responseMessage ? <div className={responseType == 'success' ? styles.success : styles.error}>{responseMessage}</div> : <div></div>}

                                <button type="submit" className={styles.submit} >Submit</button>
                            </form>




                        </Col>


                    </Row>


                </Container>


        </>

    )
}


export default changePasswordPage;