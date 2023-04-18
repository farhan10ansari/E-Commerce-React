import { useEffect, useState } from "react";

import Container from "react-bootstrap/esm/Container";

import Product from "../../components/userOrderProduct/OrderProduct";

import styles from "./userorders.module.css";

const UserOrders = ({ user }) => {
  const [isPending, setIsPending] = useState(false);

  const [products, setProducts] = useState([]);



  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    setIsPending(true);

    let token = localStorage.getItem("accessToken");

    fetch("http://localhost:3333/ordersUser", {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
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
      .catch(async (err) => {
        console.log(err);
        setIsPending(false);
      });
  };

  const handleCancel = (index, order_id, product_id) => {
    // console.log(index, order_id, product_id);
    let token = localStorage.getItem("accessToken");
    let req = new XMLHttpRequest();
    req.open("POST", "http://localhost:3333/cancelOrder");
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Authorization", token);
    req.addEventListener("load", (res) => {
      if (req.responseText == "success") {

        products[index].order_status="cancelled";
        setProducts([...products]);

      } else {
        console.log(req.responseText);

      }
    });
    let data = { product_id, order_id };
    req.send(JSON.stringify(data));
  };

  return (
    <>
      <Container fluid>
        {isPending ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>Loading Orders...</h1>
          </div>
        ) : (
          <div className="row-12">
            {user.usertype == "user" ? (
              products.map((product, index) => {
                return (
                  <Product
                    product={product}
                    handleCancel={handleCancel}
                    key={product.order_id+product.product_id}
                    index={index}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
        )}
      </Container>
    </>
  );
};

export default UserOrders;
