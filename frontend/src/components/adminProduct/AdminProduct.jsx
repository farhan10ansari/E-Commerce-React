

import "./adminproduct.css";

function SellerProduct({product,message,messageId,index,handleProductName,handlePrice,handleQuantity,handleDetails,handleSellerUsername,handleImage,handleDelete,handleUpdate}) {
  // console.log(product.quantity);

  // console.log("product");
  return (
    <>
    <div className="card mb-3 product" style={{maxWidth:"100%"}}>
    <div className="row g-0 m-2">
      <div className="col-md-4">
        <img src={`http://localhost:3333/${product.image}`} className="img-fluid rounded-start productImage" alt="..."/>
        <input  style={{display:"inline"}} type="file" onChange={(e)=>{handleImage(e,index)}}/>
      </div>
      <div className="col-md-8">
        <div className="card-body">
 
            <div className="row mt-3">
                    <label className="col-sm-3 font-weight-bold" htmlFor="product_name">Product Name: </label>
                    <input type="text" className="col-sm-9" id="product_name" value={product.product_name} onChange={(e)=>{handleProductName(e,index)}} />
            </div>
            <div className="row mt-3">
                <label className="col-sm-3 font-weight-bold" htmlFor="price">Price: ₹ </label>
                    <input className="col-sm-9" type="number"  id="price" value={product.price} onChange={(e)=>{handlePrice(e,index)}}/>
            </div>
            <div className="row mt-3">
                <label className="col-sm-3 font-weight-bold" htmlFor="quantity">Quantity: </label>
                   <input className="col-sm-9" type="number" id="quantity" value={product.quantity} onChange={(e)=>{handleQuantity(e,index)}}/>
            </div>
            <div className="row mt-3">
                <label className="col-sm-3 font-weight-bold" htmlFor="details">Details: </label>
                    <textarea className="col-sm-9" id="details" value={product.details} onChange={(e)=>{handleDetails(e,index)}}></textarea>
            </div>
            <div className="row mt-3">
                <label className="col-sm-3 font-weight-bold" htmlFor="quantity">SellerUsername: </label>
                   <input className="col-sm-9" type="text" id="quantity" value={product.seller_username} onChange={(e)=>{handleSellerUsername(e,index)}}/>
            </div>
            
            
            <div className="row mt-3">
              <div className="col-sm-3"></div>
                <a className="col-sm-4 btn btn-primary button mt-2 updatebutton" onClick={(e)=>{handleUpdate(product.product_id,index)}}>Update</a>
                <div className="col-sm-1"></div>
                <a className="col-sm-4 btn btn-danger button mt-2 deletebutton" onClick={(e)=>{handleDelete(product.product_id,index)}}>Delete</a>
            </div>

            <div className="row mt-3">
              <div className="col-sm-3"></div>
              {messageId==index ? <div className="col-sm-9 btn btn-warning mt-3">{message}</div> : <div></div> } 
            </div>


            
        </div>
      </div>
    </div>
  </div>
  </>


  );
}

export default SellerProduct;