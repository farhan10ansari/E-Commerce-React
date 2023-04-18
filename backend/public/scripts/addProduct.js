function removeErrorMessage()
{
    let errormessage=document.getElementById("errormessage");
    errormessage.innerText="";
    errormessage.style.display="none";
}
function submitButtonCLicked(event)
{
    event.preventDefault();

    let newform=new FormData(form);

    let req=new XMLHttpRequest();
    req.open("POST","/addproduct");
    req.addEventListener("load",function(res){
        if(req.responseText=='success')
        {
            let errormessage=document.getElementById("errormessage");
            errormessage.innerText="Product Added Successfully";
            errormessage.style.display="block";
            form.reset();
        }
        else{
            let errormessage=document.getElementById("errormessage");
            errormessage.innerText="Error In Adding Product";
            errormessage.style.display="block";
        
        }
        setTimeout(removeErrorMessage,2000);
    });
    req.send(newform);


}





let form=document.getElementById("addproductform");
form.addEventListener("submit",submitButtonCLicked);