function removeMessage()
{
    document.getElementById("message").style.display="none";
}


function cancelButtonClicked(event)
{
    // console.log(event.target.parentNode.parentNode.children[1].children[0].children[6].children[1]);
    // console.log(event.target.parentNode);
    // return;

    let product_id=event.target.getAttribute("product_id");
    let order_id=event.target.getAttribute("order_id");
    console.log(product_id,order_id);

    let req=new XMLHttpRequest();
    req.open("POST","/cancelOrder");
    req.setRequestHeader("Content-Type","application/json");
    req.addEventListener("load",(res)=>{
        if(req.responseText=='success')
        {
            event.target.parentNode.parentNode.children[1].children[0].children[6].children[1].innerText="cancelled";
            event.target.parentNode.parentNode.children[1].children[0].children[6].children[1].style.color="red";
            document.getElementById("message").innerText="Item Cancelled";
            document.getElementById("message").style.display="inline";
            setTimeout(removeMessage,1000);
            event.target.parentNode.remove();
        }
        else{
            console.log(req.responseText);
            document.getElementById("message").innerText="Some Error Occured";
            document.getElementById("message").style.display="inline";
            setTimeout(removeMessage,1000);
        }
    })
    let data={product_id,order_id};
    req.send(JSON.stringify(data));

}

let cb=document.getElementsByClassName("cancelbutton");
for(let i=0;i<cb.length;i++)
{
    cb[i].addEventListener("click",cancelButtonClicked)
}