import { useEffect, useState } from "react";





import Container from "react-bootstrap/esm/Container";

import Product from "../../components/userProduct/Product";

import styles from "./home.module.css";

const UserHome = ({user}) => {

    const [loadingMessage,setLoadingMessage]=useState("Loading Products...")

    const [message,setMessage]=useState("");
    const [messageId,setMessageId]=useState("");

    const [isPending, setIsPending] = useState(false);
    const [products, setProducts] = useState([]);
    const [pagenumber, setPagenumber] = useState(1);

    useEffect(() => {

            loadProduct(pagenumber);

    }, [pagenumber])



    //user
    const loadProduct = async (pagenumber) => {
        setIsPending(true);

        let token=localStorage.getItem("accessToken");

        fetch("http://localhost:3333/getProducts",{
            headers:{
                'Authorization':token,
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify({pagenumber})
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
            setProducts(data)
            setIsPending(false);


        }).catch(async (err)=>{
            console.log(err);
            let error=await err.json();
            setLoadingMessage(error);

        })





    }

    const nextButtonClicked=(e)=>{
        // pagenumber++;
        // console.log("next")
        setPagenumber(pagenumber+1);
    }

    const prevButtonClicked=(e)=>{
        // pagenumber--;
        // console.log('prev')
        setPagenumber(pagenumber-1);
    }

    const removeMessage=()=>
    {
        setTimeout(()=>{ setMessage("") },2000)
    }

    const addToCartHandler=(product_id)=>{
        // console.log("add to cart clicked");
        // console.log(product_id);

        let token=localStorage.getItem("accessToken");

        fetch("http://localhost:3333/addToCart",{
            headers:{
                'Authorization':token,
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify({productId:product_id})
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
            // setProducts(data)
            // setIsPending(false);
            setMessageId(product_id);
            setMessage("Added To Cart");
            removeMessage();


        }).catch(async (err)=>{
            // console.log(err);
            let error=await err.json();
            console.log(error);
            setMessageId(product_id)
            setMessage(error);
            removeMessage();

            

        })


    }


    

    return (
        <>
            <Container fluid>

                {isPending ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><h1>{loadingMessage}</h1></div> :

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                        {user.usertype == 'user' ?

                            products.map((product) => {
                                return <Product product={product} addToCartHandler={addToCartHandler} message={message} messageId={messageId} key={product.product_id}/>

                            })

                            : <></>

                        }

                    </div>


                }
            </Container>

            
                <div className={styles.buttons}>
                    {pagenumber>1 && <button className="btn bg-primary navbutton mx-3 my-2" onClick={prevButtonClicked}>Prev</button>}
                    {products.length==10 && <button className="btn bg-primary navbutton mx-3 my-2" onClick={nextButtonClicked} >Next</button>}
                </div>
                <div className={styles.pagenumber}>
                    <p>Page Number:<span id="pagenumber">{pagenumber}</span></p>
                </div>

            


        </>
    );
}

export default UserHome;
