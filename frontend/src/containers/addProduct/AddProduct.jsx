import { useEffect, useState } from "react";




import styles from "./addProduct.module.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




const AddProduct = ({ user }) => {
    // console.log(user);

    let [responseMessage, setResponseMessage] = useState('');
    let [responseType, setResponseType] = useState('');

    let [usertype, setUsertype] = useState("");
    let [productname, setProductname] = useState("");
    let [price, setPrice] = useState("");
    let [quantity, setQuantity] = useState("");
    let [details, setDetails] = useState("");
    let [image,setImage]=useState("");

    let [sellerUsername,setSellerUsername]=useState("");




    const handleSubmit = async (e) => {
        e.preventDefault();

        let token=localStorage.getItem("accessToken");

        let formData=new FormData();
        formData.append("productname",productname);
        formData.append("price",price);
        formData.append("quantity",quantity);
        formData.append("details",details);

        if(user.usertype=='admin')
        {
            formData.append("seller_username",sellerUsername);
        }

        formData.append("file",image);



        
        fetch("http://localhost:3333/addproduct",{
            headers:{
                'Authorization':token
            },
            method:"POST",
            body:formData
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
            // console.log(data);
            setResponseMessage(data);
            setResponseType("success");


            setProductname("");
            setPrice("");
            setQuantity("");
            setDetails("");
            e.target.reset();

        }).catch(async (err)=>{
            // console.log(err);
            let error= await err.json();
            // console.log(error);
            setResponseMessage(error);
            setResponseType("error");

        })
        


    }




    useEffect(() => {
        // console.log(usertype,name,username,email,phone,password,showpw)
    })


    return (
        <>


            <Container className="d-flex justify-content-center flex-column" style={{ height: "90vh" }}>

                <Row>


                    <Col sm={0} md={6} className={styles.main}>
                        <h1 className={styles.heading}>E-COMMERCE</h1>
                        <h1 className={styles.head}>Add Products</h1>
                    </Col>
                    <Col sm={12} md={6} className={styles.formcontainer}>

                        <form className={styles.form} onSubmit={handleSubmit}>


                            <input type="text" className={styles.input} placeholder="ProductName" value={productname} onChange={(e) => { setProductname(e.target.value) }} required />

                            <input type="number" className={styles.input} placeholder="Price" value={price} onChange={(e) => { setPrice(e.target.value) }} required />

                            <input type="number" className={styles.input} placeholder="Quantity" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} required />

                            <input type="text" className={styles.input} placeholder="Details" value={details} onChange={(e) => { setDetails(e.target.value) }} required />

                            { user.usertype=='admin' && <input type="text" className={styles.input} placeholder="Seller_Username" value={sellerUsername} onChange={(e) => { setSellerUsername(e.target.value) }} required />}

                            <label htmlFor="formFile" className="form-label">Product Image</label>
                            <input className="form-control" type="file" id="formFile"  onChange={(e)=>{setImage(e.target.files[0])}}></input>



                            {responseMessage ? <div className={responseType == 'success' ? styles.success : styles.error}>{responseMessage}</div> : <div></div>}


                            <button type="submit" className={styles.submit} >Add Product</button>
                        </form>




                    </Col>


                </Row>


            </Container>






        </>


    )

}


export default AddProduct;