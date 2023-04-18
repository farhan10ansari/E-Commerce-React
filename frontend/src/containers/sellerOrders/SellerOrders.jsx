import { useEffect, useState } from "react";


import Container from "react-bootstrap/esm/Container";

import Product from "../../components/sellerOrderProduct/OrderProduct";

import styles from "./sellerorders.module.css";

const Home = ({ user }) => {
  const [isPending, setIsPending] = useState(false);

  const [products, setProducts] = useState([]);


  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    setIsPending(true);

    let token = localStorage.getItem("accessToken");

    fetch("http://localhost:3333/ordersSeller", {
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
            {products.map((product, index) => {
              return (
                <Product
                  product={product}
                  key={product.order_id+product.product_id}
                  index={index}
                />
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
};

export default Home;
