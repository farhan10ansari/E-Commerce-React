function detailsbuttonclicked(event) {
    let x = document.getElementsByClassName("detailsbutton");
    for (var i = 0; i < x.length; i++) {
        if (x[i] == event.target) {
            continue;
        }
        x[i].parentNode.children[2].children[0].classList.remove("show");
    }

    event.target.parentNode.children[2].children[0].classList.toggle("show");
}

let x = document.getElementsByClassName("detailsbutton");
for (let i = 0; i < x.length; i++) {
    x[i].addEventListener("click", detailsbuttonclicked);
}

function removeMessage() {
    document.getElementById("message").style.display = "none";
}



function minusButtonClicked(event) {
    // console.log("minus");
    let productId = event.target.parentNode.parentNode.parentNode.parentNode.id;

    let quantity = event.target.parentNode.children[0].children[0].innerText;
    quantity = parseInt(quantity);

    let request = new XMLHttpRequest();
    request.open("POST", "/minusButtonClicked");
    request.setRequestHeader("Content-Type", "application/json")
    request.addEventListener("load", function (res) {
        let result = JSON.parse(request.responseText);
        // console.log(result);
        if (result.err) {
            console.log(result.err);
        }
        else if (result.quantity == result.totalquantity) {
            event.target.parentNode.children[0].children[0].innerText = result.quantity
            console.log(event.target.parentNode.children[3]);
            event.target.parentNode.children[3].innerText = `Available Quantity: ${result.totalquantity}`;
        }
        else {
            event.target.parentNode.children[0].children[0].innerText = result.quantity;
            event.target.parentNode.children[3].innerText = ``;
        }

        if (result.totalquantity == 0) {
            event.target.parentNode.parentNode.parentNode.parentNode.classList.add("faded");
        }
        else {
            event.target.parentNode.parentNode.parentNode.parentNode.classList.remove("faded");
        }

        // console.log(request.responseText);
        refreshTotalPrice();
    })
    let data = { productId, quantity }
    request.send(JSON.stringify(data));
}


function plusButtonClicked(event) {
    // console.log("plus");
    let productId = event.target.parentNode.parentNode.parentNode.parentNode.id;
    // console.log(productId);
    quantity = event.target.parentNode.children[0].children[0].innerText;
    quantity = parseInt(quantity);

    let request = new XMLHttpRequest();
    request.open("POST", "/plusButtonClicked");
    request.setRequestHeader("Content-Type", "application/json")
    request.addEventListener("load", function (res) {
        let result = JSON.parse(request.responseText)
        // console.log(result.quantity,result.totalquantity);
        // return
        if (result.err) {
            console.log(result.err);
        }
        else if (result.quantity == result.totalquantity) {
            event.target.parentNode.children[0].children[0].innerText = result.quantity

            event.target.parentNode.children[3].innerText = `Available Quantity: ${result.totalquantity}`;
        }
        else {
            event.target.parentNode.children[0].children[0].innerText = result.quantity;

        }

        if (result.totalquantity == 0) {
            event.target.parentNode.parentNode.parentNode.parentNode.classList.add("faded");
        }
        else {
            event.target.parentNode.parentNode.parentNode.parentNode.classList.remove("faded");
        }

        refreshTotalPrice();
    })
    let data = { productId, quantity }
    request.send(JSON.stringify(data));
}
function deleteButtonClicked(event) {
    // console.log("dlete");
    let productId = event.target.parentNode.parentNode.parentNode.id;

    let request = new XMLHttpRequest();
    request.open("POST", "/deleteButtonClicked");
    request.setRequestHeader("Content-Type", "application/json")
    request.addEventListener("load", function (res) {
        if (request.responseText == "success") {
            let p = event.target.parentNode.parentNode.parentNode.parentNode;
            let c = event.target.parentNode.parentNode.parentNode;
            p.removeChild(c);
            console.log("done");
        }
        else {
            console.log(request.responseText);
        }

        refreshTotalPrice();

    })
    let data = { productId: productId }
    request.send(JSON.stringify(data));



}

let m = document.getElementsByClassName("minusbutton");
let p = document.getElementsByClassName("plusbutton");
let d = document.getElementsByClassName("deletebutton");
for (let i = 0; i < m.length; i++) {
    m[i].addEventListener("click", minusButtonClicked)
}

for (let i = 0; i < p.length; i++) {
    p[i].addEventListener("click", plusButtonClicked)
}

for (let i = 0; i < d.length; i++) {
    d[i].addEventListener("click", deleteButtonClicked)
}



//total price

function getTotalPrice(callback) {
    let req = new XMLHttpRequest();
    req.open("Get", "/getTotalPrice");
    req.addEventListener("load", (res) => {
        let result = JSON.parse(req.responseText);
        // console.log(result);
        callback(result.totalprice)
    })

    req.send();
}
function refreshTotalPrice() {
    getTotalPrice((totalprice) => {
        document.getElementById("totalprice").innerText = totalprice;
    })
}

refreshTotalPrice();

//checkout

function checkout(payment_id) {

    let products = document.querySelectorAll(".product");
    let address=document.getElementById("address").value;
    // console.log(address);

    let req = new XMLHttpRequest()
    req.open("POST", "/checkout");
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener("load", (res) => {
        console.log(req.responseText);
        if (req.responseText == 'success') {
            document.getElementById("message").innerText = "Order Placed Successfully";
            document.getElementById("message").style.display = "inline";
            setTimeout(removeMessage, 1000);


            // console.log(products);
            for (let i = 0; i < products.length; i++) {
                products[i].remove();
            }
            // console.log(address)
            document.getElementById("address").value = "";
        }
        else {
            document.getElementById("message").innerText = "Please Check Products for Availability";
            document.getElementById("message").style.display = "inline";
            setTimeout(removeMessage, 1000);

        }

    })

    req.send(JSON.stringify({ address,payment_id }));
}

//payment


document.getElementById('rzp-button1').onclick = async function (e) {
    e.preventDefault();

    let products = document.querySelectorAll(".product");
    if (products.length <= 0) {
        document.getElementById("message").innerText = "Please Add Items First";
        document.getElementById("message").style.display = "inline";
        setTimeout(removeMessage, 1000);
        return;

    }

    let address = document.getElementById("address").value;
    if (address == '') {
        document.getElementById("message").innerText = "Please Enter Address First";
        document.getElementById("message").style.display = "inline";
        setTimeout(removeMessage, 1000);
        return;
    }


    getTotalPrice(async (totalprice) => {


        let response = await fetch("/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: totalprice,
            })

        })

        let orderData = await response.json();
        console.log(orderData);



        var options = {
            "key": "rzp_test_95nWLgZitJP9t9", // Enter the Key ID generated from the Dashboard
            "amount": totalprice*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "order_id": orderData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response) {
                // alert(response.razorpay_payment_id);
                checkout(response.razorpay_payment_id);
                console.log("Payment Success");
            },

        };

        var rzp1 = new Razorpay(options)

        rzp1.on('payment.failed', function (response){
            alert("payment-failed");
        });
        rzp1.open();












    })


};

