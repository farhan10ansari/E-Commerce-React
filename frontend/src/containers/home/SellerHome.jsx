import { useEffect, useState } from "react";





import Container from "react-bootstrap/esm/Container";

import SellerProduct from "../../components/sellerProduct/SellerProduct";

import styles from "./home.module.css";

const SellerHome = ({user}) => {

    const [loadingMessage,setLoadingMessage]=useState("Loading Products...")

    const [message,setMessage]=useState("");
    const [messageId,setMessageId]=useState(-1);

    const [isPending, setIsPending] = useState(false);
    const [products, setProducts] = useState([]);
    const [imageArr,setImageArr]=useState([]);
    const [pagenumber, setPagenumber] = useState(1);
 

    useEffect(() => {

            loadProduct(pagenumber);

    }, [pagenumber]);





    //user
    const loadProduct = async (pagenumber) => {
        setIsPending(true);

        let token=localStorage.getItem("accessToken");

        fetch("http://localhost:3333/getSellerProducts",{
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
            for(let i=0;i<data.length;i++)
            {
                imageArr.push("");
            }
            setImageArr([...imageArr]);
            setProducts(data)
            setIsPending(false);


        }).catch(async (err)=>{
            console.log(err);
            let error=await err.json();
            setLoadingMessage(error)

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
        setTimeout(()=>{ setMessageId(-1) },2000)
    }


    const handleProductName=(e,index)=>{
        products[index].product_name=e.target.value;
        setProducts([...products]);

    }
    const handlePrice=(e,index)=>{
        products[index].price=e.target.value;
        setProducts([...products]);
        
    }
    const handleQuantity=(e,index)=>{
        products[index].quantity=e.target.value;
        setProducts([...products]);
        
    }
    const handleDetails=(e,index)=>{
        products[index].details=e.target.value;
        setProducts([...products]);
        
    }

    const handleImage=(e,index)=>{
        imageArr[index]=e.target.files[0];
        setImageArr([...imageArr]);
        console.log(imageArr);
        
    }


    const handleUpdate=(product_id,index)=>{
        // console.log(product_id,index)

        let token=localStorage.getItem("accessToken");

        const formData = new FormData();
        formData.append("product_id",product_id);
        formData.append("product_name",products[index].product_name);
        formData.append("price",products[index].price);
        formData.append("quantity",products[index].quantity);
        formData.append("details",products[index].details);
        formData.append("file",imageArr[index]);
        

  

        
        fetch("http://localhost:3333/updateProduct",{
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

            products[index].image=data.image;
            setMessage("Product Updates Successfully");
            setMessageId(index);

            removeMessage();



        }).catch(async (err)=>{
            // console.log(err);
            let error= await err.json();
            console.log(error);

            setMessage("Error in Updating Product");
            setMessageId(index);

            removeMessage()


        })
        




    }


    const handleDelete=(product_id,index)=>{
        console.log("delete button");
        let token=localStorage.getItem("accessToken");

        let req=new XMLHttpRequest();
        req.open("POST","http://localhost:3333/deleteProduct");
        req.setRequestHeader("Content-Type","application/json");
        req.setRequestHeader("Authorization",token);
        req.addEventListener("load",(res)=>{
            if(req.status==200)
            {
                setProducts(products.filter((product,i)=>{
                    return i!=index;
                }))
                
                
            }
            else{
                console.log(JSON.parse(req.responseText))
            }
    
        })
        req.send(JSON.stringify({product_id}));
        
    }
   




    

    return (
        <>
            <Container fluid>

                {isPending ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><h1>{loadingMessage}</h1></div> :

                    <div className="row-12 mt-3">
                        {

                            products.map((product,index) => {
                                return <SellerProduct product={product}  
                                                    message={message} 
                                                    messageId={messageId} 
                                                    key={product.product_id} 
                                                    index={index}
                                                    handleProductName={handleProductName}
                                                    handlePrice={handlePrice}
                                                    handleQuantity={handleQuantity}
                                                    handleDetails={handleDetails}
                                                    handleImage={handleImage}
                                                    handleDelete={handleDelete}
                                                    handleUpdate={handleUpdate}
                                                    />

                            })
                        }



                    </div>


                }
            </Container>

            
                <div className={styles.buttons}>
                    {pagenumber>1 && <button className="btn bg-primary navbutton mx-3 my-2" onClick={prevButtonClicked}>Prev</button>}
                    {products.length==5 && <button className="btn bg-primary navbutton mx-3 my-2" onClick={nextButtonClicked} >Next</button>}
                </div>
                <div className={styles.pagenumber}>
                    <p>Page Number:<span id="pagenumber">{pagenumber}</span></p>
                </div>

            


        </>
    );
}

export default SellerHome;
