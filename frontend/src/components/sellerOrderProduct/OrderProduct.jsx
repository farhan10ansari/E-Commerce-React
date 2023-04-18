import "./orderproduct.css";

function Product({ product,index}) {
    // console.log(product.quantity);

    // console.log("product");
    return (
        <div className="card mb-3 productscontainer" style={{maxWidth:"100%"}} id="<%= product.product_id %>">
    <div className="row g-0 m-2 product">
      <div className="col-md-4">
        <img src={"http://localhost:3333/" + product.image} className="img-fluid rounded-start productImage" alt="..."/>
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <div className="row mt-1">
            <label className="col-sm-4 label" htmlFor="ordered_on">Ordered On: </label>
                <p className="col-sm-8"  id="ordered_on">{product.date} {"  "} {product.time}</p>
          </div>
            <div className="row">
                    <label className="col-sm-4 label" htmlFor="product_name">Product Name: </label>
                    <p className="col-sm-8" id="product_name">{product.product_name}</p>
            </div>
            <div className="row">
                <label className="col-sm-4 label" htmlFor="price">Price: </label>
                    <p className="col-sm-8"  id="price">{product.price}</p>
            </div>
            <div className="row">
                <label className="col-sm-4 label" htmlFor="quantity">Quantity: </label>
                   <p className="col-sm-8" id="quantity">{product.quantity}</p>
            </div>
            <div className="row">
                <label className="col-sm-4 label" htmlFor="details">Details: </label>
                    <p className="col-sm-8" id="details" >{ product.details }</p>
            </div>
            <div className="row">
              <label className="col-sm-4 label" htmlFor="order_id">Order_id: </label>
              <p className="col-sm-8" id="order_id">{ product.order_id }</p>
            </div>
            <div className="row mt-1">
              <label className="col-sm-4 label" htmlFor="order_state">Order Status: </label>
                  <p className={`col-sm-8 ${product.order_status}`}  id="order_state" >{ product.order_status }</p>
            </div>
            <div className="row mt-1">
              <label className="col-sm-4 label" htmlFor="address">Address: </label>
                  <p className="col-sm-8"  id="address">{ product.address }</p>
            </div>
            <div className="row mt-1">
              <label className="col-sm-4 label" htmlFor="phone">Phone: </label>
                  <p className="col-sm-8"  id="phone">{ product.phone }</p>
            </div>
            <div className="row mt-1">
              <label className="col-sm-4 label" htmlFor="email">Email: </label>
                  <p className="col-sm-8"  id="email">{ product.email }</p>
            </div>
            <div className="row">
              <label className="col-sm-4  label h5" htmlFor="total_price">Total Price: </label>
                  <p className="col-sm-8 font-weight-bold h5"  id="total_price">{ product.price*product.quantity }</p>
            </div>

            
        </div>
      </div>
      
      
    </div>
  </div>


    );
}

export default Product;


// style="<% if(product.order_status=='cancelled'){ %> color:red; <% } %>"