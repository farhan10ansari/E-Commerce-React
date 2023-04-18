import Container from "react-bootstrap/esm/Container";

import { useState, useEffect } from "react";

import styles from "./cart.module.css";

import Product from "../../components/cartProduct/CartProduct";

import "https://checkout.razorpay.com/v1/checkout.js"

const Cart = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messageId, setMessageId] = useState("");

  const [totalprice, setTotalprice] = useState("");

  const [isPending, setIsPending] = useState(false);
  const [usertype, setUsertype] = useState("");
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);

  const [checkoutMessage, setCheckoutMessage] = useState("");

  const [address, setAddress] = useState("");

  useEffect(() => {
    setUsertype(user.usertype);
    setName(user.name);
    loadProduct();
    refreshTotalPrice();
  }, []);

  const loadProduct = async (pagenumber) => {
    setIsPending(true);

    let token = localStorage.getItem("accessToken");

    fetch("http://localhost:3333/getCartProducts", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.status == 200) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((data) => {
        // console.log(data);
        setProducts(data);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
      });
  };

  const deleteHandler = (productId, index) => {
    // console.log("delete", productId, index);

    let token = localStorage.getItem("accessToken");

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3333/deleteButtonClicked");
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", token);
    request.addEventListener("load", function (res) {
      if (request.responseText == "success") {
        setProducts(
          products.filter((product, i) => {
            return i != index;
          })
        );
      } else {
        console.log(request.responseText);
      }
      refreshTotalPrice();
    });
    let data = { productId };
    request.send(JSON.stringify(data));
  };
  const plusHandler = (productId, index) => {
    // console.log(productId);
    let token = localStorage.getItem("accessToken");
    let quantity = products[index].quantity;
    quantity = parseInt(quantity);

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3333/plusButtonClicked");
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", token);
    request.addEventListener("load", function (res) {
      let result = JSON.parse(request.responseText);

      if (result.err) {
        console.log(result.err);
      } else if (result.quantity == result.totalquantity) {

        setMessage(`Available Quantity: ${result.totalquantity}`);
        setMessageId(productId);

        products[index].quantity = result.quantity;
        setProducts([...products]);
      } else {
        products[index].quantity = result.quantity;
        setProducts([...products]);
      }
      refreshTotalPrice();
    });

    let data = { productId, quantity };
    request.send(JSON.stringify(data));
  };
  const minusHandler = (productId, index) => {
    // console.log("minus", productId, index);
    let token = localStorage.getItem("accessToken");
    let quantity = products[index].quantity;
    quantity = parseInt(quantity);

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3333/minusButtonClicked");
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", token);
    request.addEventListener("load", function (res) {
      let result = JSON.parse(request.responseText);
      //   console.log(result.quantity,result.totalquantity);
      // return
      if (result.err) {
        console.log(result.err);
      } else if (result.quantity == result.totalquantity) {

        setMessage(`Available Quantity: ${result.totalquantity}`);
        setMessageId(productId);

        products[index].quantity = result.quantity;
        setProducts([...products]);
      } else {
        products[index].quantity = result.quantity;
        setProducts([...products]);

        setMessage("");
      }
      refreshTotalPrice();
    });

    let data = { productId, quantity };
    request.send(JSON.stringify(data));
  };

  function getTotalPrice(callback) {
    let token = localStorage.getItem("accessToken");
    let req = new XMLHttpRequest();
    req.open("Get", "http://localhost:3333/getTotalPrice");
    req.setRequestHeader("Authorization", token);
    req.addEventListener("load", (res) => {
      let result = JSON.parse(req.responseText);
      // console.log(result);
      callback(result.totalprice);
    });

    req.send();
  }
  function refreshTotalPrice() {
    getTotalPrice((totalprice) => {
      setTotalprice(totalprice);
    });
  }

  function removeMessage() {
    setCheckoutMessage("");
  }

  function checkout(payment_id) {
    let products = document.querySelectorAll(".product");

    let token = localStorage.getItem("accessToken");


    let req = new XMLHttpRequest();
    req.open("POST", "http://localhost:3333/checkout");

    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Authorization", token);
    req.addEventListener("load", (res) => {
      console.log(req.responseText);
      if (req.responseText == "success") {
        setCheckoutMessage("Order Placed Successfully")
        setTimeout(removeMessage, 1000);

        // console.log(products);
        setProducts([]);
        // console.log(address)
        setAddress("");
      } else {
        
        setCheckoutMessage("Please Check Products for Availability");
        setTimeout(removeMessage, 1000);
      }
    });

    req.send(JSON.stringify({ address, payment_id }));
  }

  let handleSubmit = async (e) => {
    // console.log("hi")
    // return
    // console.log(address);
    if (products.length <= 0) {
      setCheckoutMessage("Please Add Items First");
      setTimeout(removeMessage, 1000);
      return;
    }

    if (address == "") {
      setCheckoutMessage("Please Enter Address First");
      setTimeout(removeMessage, 1000);
      return;
    }

    getTotalPrice(async (totalprice) => {
      let response = await fetch("http://localhost:3333/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalprice,
        }),
      });

      let orderData = await response.json();
      console.log(orderData);

      var options = {
        key: "rzp_test_95nWLgZitJP9t9", // Enter the Key ID generated from the Dashboard
        amount: totalprice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        order_id: orderData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          // alert(response.razorpay_payment_id);
          checkout(response.razorpay_payment_id);
          console.log("Payment Success");
        },
      };

      var rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        alert("payment-failed");
      });
      rzp1.open();
    });
  };

  return (
    <>
      <Container fluid>
        <div
          className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5"
          style={{ height: "74vh", overflow: "scroll" }}
        >
          {isPending ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>Loading Products...</h1>
            </div>
          ) : (
            products.map((product, index) => {
              return (
                <Product
                  product={product}
                  deleteHandler={deleteHandler}
                  plusHandler={plusHandler}
                  minusHandler={minusHandler}
                  message={message}
                  messageId={messageId}
                  key={product.product_id}
                  index={index}
                />
              );
            })
          )}
        </div>
        <div className={`row cartbottom ${styles.cartbottom}`} id="cartbottom">
          <div className="col-12 col-md-6 p-2">
            <textarea
              value={address}
              className={styles.address}
              placeholder="Enter Address"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="col-12 col-md-6 p-2">
            <div className="col-12  font-weight-bold my-3">
              Total Price: ₹<span>{totalprice}</span>
              {checkoutMessage && (
                <span style={{ color: "red", marginLeft: "20px" }}>
                  {checkoutMessage}
                </span>
              )}
            </div>

            <button
              className="col-12   btn btn-warning my-3"
              id="rzp-button1"
              onClick={handleSubmit}
            >
              CheckOut
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
