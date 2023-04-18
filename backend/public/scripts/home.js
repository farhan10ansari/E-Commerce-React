//details button

function detailsbuttonclicked(event)
{
    let x=document.getElementsByClassName("detailsbutton");
    for(var i=0;i<x.length;i++){
        if(x[i]==event.target)
        {
            continue;
        }
        x[i].parentNode.children[2].children[0].classList.remove("show");
    }

    event.target.children[0].classList.toggle("show");
    // parentNode.children[2].
}

let x=document.getElementsByClassName("detailsbutton");
for(let i=0;i<x.length;i++)
{
    x[i].addEventListener("click",detailsbuttonclicked);
}



//addtocart
function removeMessage()
{
    document.getElementById("message").style.display="none";
}

function addToCartClicked(event)
{
    let productId=event.target.parentNode.parentNode.parentNode.id;
    // console.log(productId);
    
    let request=new XMLHttpRequest();
    request.open("POST","/addToCart");
    request.setRequestHeader("Content-Type","application/json")
    request.addEventListener("load",function(res){
        if(request.responseText=="Item Out Of Stock")
        {
            console.log(`${productId} Out of Stock`);
            document.getElementById("message").innerText="Item Out of Stock";
            document.getElementById("message").style.display="inline";
            setTimeout(removeMessage,1000);
        }
        else if(request.responseText=="success")
        {
            console.log(`${productId} Added to Cart`);

            document.getElementById("message").innerText="Item Added to Cart";
            document.getElementById("message").style.display="inline";
            setTimeout(removeMessage,1000);
        }
        else{
            console.log("Error",request.responseText);
        }
    })
    let data={productId:productId}
    request.send(JSON.stringify(data));
}

let a=document.getElementsByClassName("addCartButton");
// console.log(a);
for(let i=0;i<a.length;i++)
{
    a[i].addEventListener("click",addToCartClicked)
}




//pagination
let totalpage=0;
let pagenumber=1;

function checkButton()
{
    if(pagenumber==1)
    {
        document.getElementById("prevbutton").style.display="none";
    }
    else{
        document.getElementById("prevbutton").style.display="inline";
    }

    if(pagenumber<totalpage)
    {
        document.getElementById("nextbutton").style.display="inline";
        
    }
    else{
        document.getElementById("nextbutton").style.display="none";
    }
}


function load(products)
{
    let parent=document.getElementById("productscontainer");
    parent.innerHTML="";

    
    // console.log(sample);
    for(let i=0;i<products.length;i++)
    {
        let sample=document.getElementById("product_template").content.cloneNode(true);
        sample.querySelector(".product").id=products[i].product_id;
        sample.querySelector(".img").src=products[i].image;
        sample.querySelector(".product_name").innerText=products[i].product_name;
        sample.querySelector(".price").innerText="₹"+products[i].price;
        sample.querySelector(".details").innerText=products[i].details;
        
        sample.querySelector(".addCartButton").addEventListener("click",addToCartClicked);
        sample.querySelector(".detailsbutton").addEventListener("click",detailsbuttonclicked);
        
        if(products[i].quantity<1)
        {
            sample.querySelector(".product").classList.add("faded");
        }
        
        parent.appendChild(sample);
        
    }
    document.getElementById("pagenumber").innerText=pagenumber;
    checkButton();
    

}


function nextPageButtonClicked()
{
    // console.log("next button");
    pagenumber++;
    let req=new XMLHttpRequest();
    req.open("post","/getProducts");
    req.setRequestHeader("Content-Type","application/json");
    req.addEventListener("load",(res)=>{
        let products=JSON.parse(req.responseText);
        load(products);

    })
    req.send(JSON.stringify({pagenumber}));
}

function prevPageButtonClicked()
{
    pagenumber--;
    let req=new XMLHttpRequest();
    req.open("post","/getProducts");
    req.setRequestHeader("Content-Type","application/json");
    req.addEventListener("load",(res)=>{
        let products=JSON.parse(req.responseText);
        load(products);

    })
    req.send(JSON.stringify({pagenumber}));
}

function getPaginationInfo()
{
    let req=new XMLHttpRequest();
    req.open("Post","/getPaginationInfo");
    req.setRequestHeader("Content-Type","application/json");
    req.addEventListener("load",(res)=>{
        totalpage=JSON.parse(req.responseText).page;
        checkButton();
    })

    req.send(JSON.stringify({pagetype:"home"}));
}

getPaginationInfo();
checkButton();