import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';

import styles from "./cartproduct.module.css";

function Product({ product, deleteHandler,plusHandler,minusHandler, message, messageId ,index}) {
    // console.log(product.quantity);

    // console.log("product");
    return (
        <Col className={styles.center}>
            <Card style={{  margin: "10px",width: "100%"  }} className={`${(product.quantity < 1) ? (styles.faded) : (styles.none)} ${styles.product}`}>
                <div className={styles.imageContainer}>
                    <Card.Img variant="top" className={styles.image} src={"http://localhost:3333/" + product.image} />
                </div>
                <Card.Body>
                    <Card.Title>{product.product_name}</Card.Title>
                    <h5 style={{ opacity: "0.7" }}>Price: ₹{product.price}</h5>
                    <Card.Text style={{ height: "20px" }}>
                        {product.details}
                    </Card.Text>
                    <Card.Text className={styles.message}>
                        {message && messageId == product.product_id && message}
                    </Card.Text>
                    <div className={styles.quantity}>
                        <h6>Quantity:<span>{product.quantity}</span></h6>
                        <button className="btn bg-secondary minusbutton mx-1" onClick={(e)=>{minusHandler(product.product_id,index)}}>-</button>
                        <button className="btn bg-secondary plusbutton mx-1" onClick={(e)=>{plusHandler(product.product_id,index)}}>+</button>
                        <h6 className="quantity_info"></h6>
                    </div>

                    <Button variant="danger" onClick={(e) => { deleteHandler(product.product_id,index) }}>Delete</Button>
                </Card.Body>
            </Card>
        </Col>


    );
}

export default Product;