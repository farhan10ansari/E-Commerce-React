import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';

import styles from "./product.module.css";

function Product({product,addToCartHandler,message,messageId}) {
  // console.log(product.quantity);

  // console.log("product");
  return (
    <Col className={styles.center}>
        <Card style={{ width:"100%",margin:"10px"}} className={`${(product.quantity<1) ? (styles.faded):(styles.none)} ${styles.product}`}>
          <div className={styles.imageContainer}>
            <Card.Img variant="top" className={styles.image} src={"http://localhost:3333/"+product.image} />
          </div>
          <Card.Body>
            <Card.Title>{product.product_name}</Card.Title>
            <h5 style={{opacity:"0.7"}}>Price: ₹{product.price}</h5>
            <Card.Text style={{height:"20px"}}>
              {product.details}
            </Card.Text>
            <Card.Text className={styles.message}>
            {message && messageId==product.product_id && message}
            </Card.Text>

            <Button variant="danger" onClick={(e)=>{addToCartHandler(product.product_id)}}>Add To Cart</Button>
          </Card.Body>
        </Card>
    </Col>


  );
}

export default Product;