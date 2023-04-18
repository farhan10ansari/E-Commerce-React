function removeMessage()
{
    document.getElementById("message").style.display="none";
}
function updateButtonClicked(event)
{
    // console.log("updatebuttonclicked");
    let id=event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;

    // console.log(id)
    // return;
    
    let product_name=event.target.parentNode.parentNode.children[0].children[1].value;

    let price=event.target.parentNode.parentNode.children[1].children[1].value;

    let quantity=event.target.parentNode.parentNode.children[2].children[1].value;

    let details=event.target.parentNode.parentNode.children[3].children[1].value;

    let image=event.target.parentNode.parentNode.parentNode.parentNode.children[0].children[1].files[0];
    // console.log(event.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[0]);

    const formData = new FormData();

    
    formData.append("product_id",id);
    formData.append("product_name",product_name);
    formData.append("price",price);
    formData.append("quantity",quantity);
    formData.append("details",details);
    formData.append("file",image);
    
    let req=new XMLHttpRequest();
    req.open("POST","/updateProduct");
    req.addEventListener("load",(response)=>{
        let result=JSON.parse(req.responseText);
        console.log(result);
        if(result.error)
        {
            let m=document.getElementById("message");
            m.innerText="Error Updating Product";
            m.style.display="inline";
            setTimeout(removeMessage,1000);
        }
        else{
            let m=document.getElementById("message");
            m.innerText="Product Updated";
            m.style.display="inline";

            event.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0].setAttribute("src",result.image);
            setTimeout(removeMessage,1000);

        }
        
    })

    req.send(formData);


    
}
function reload()
{
    getPaginationInfo();
    let req=new XMLHttpRequest();
    req.open("post","/getSellerProducts");
    req.setRequestHeader("Content-Type","application/json");
    req.addEventListener("load",(res)=>{
        let products=JSON.parse(req.responseText);

        load(products);
        // console.log(products);

    })
    req.send(JSON.stringify({pagenumber}));
}

function deleteButtonClicked(event)
{
    console.log("delete button");
    let product=event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
    let id=product.id;
    let req=new XMLHttpRequest();
    req.open("POST","/deleteProduct");
    req.setRequestHeader("Content-Type","application/json");
    req.addEventListener("load",(res)=>{
        if(req.responseText=='success')
        {
            // product.remove();
            let m=document.getElementById("message");
            m.innerText="Product Deleted";
            m.style.display="inline";
            setTimeout(removeMessage,1000);
            reload();
        }
        else{
            console.log(req.responseText);
        }

    })
    req.send(JSON.stringify({id}));
    
}

let u=document.getElementsByClassName("updatebutton");
let d=document.getElementsByClassName("deletebutton");

for(let i=0;i<u.length;i++)
{
    u[i].addEventListener("click",updateButtonClicked)
}
for(let i=0;i<d.length;i++)
{
    d[i].addEventListener("click",deleteButtonClicked)
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
        let sample=document.getElementById("sellerpagetemplate").content.cloneNode(true);
        sample.querySelector(".product").id=products[i].product_id;
        sample.querySelector(".productImage").src=products[i].image;
        sample.querySelector(".product_name").value=products[i].product_name;
        sample.querySelector(".price").value=products[i].price;
        sample.querySelector(".quantity").value=products[i].quantity;
        sample.querySelector(".details").value=products[i].details;

        sample.querySelector(".updatebutton").addEventListener("click",updateButtonClicked);
        sample.querySelector(".deletebutton").addEventListener("click",deleteButtonClicked);

        parent.appendChild(sample);

    }

    document.getElementById("pagenumber").innerText=pagenumber;
    checkButton();
    

}


function nextPageButtonClicked()
{
    console.log("next button");
    pagenumber++;
    let req=new XMLHttpRequest();
    req.open("post","/getSellerProducts");
    req.setRequestHeader("Content-Type","application/json");
    req.addEventListener("load",(res)=>{
        let products=JSON.parse(req.responseText);

        load(products);
        // console.log(products);

    })
    req.send(JSON.stringify({pagenumber}));
}

function prevPageButtonClicked()
{
    pagenumber--;
    let req=new XMLHttpRequest();
    req.open("post","/getSellerProducts");
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
        // console.log(totalpage);
        checkButton();
    })

    req.send(JSON.stringify({pagetype:"sellerpage"}));
}

getPaginationInfo();
checkButton();
