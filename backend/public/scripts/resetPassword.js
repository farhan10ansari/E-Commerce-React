function removeErrorMessage()
{ 
    let errormessage=document.getElementById("errormessage");
    errormessage.innerText="";
    errormessage.style.display="none";
}
function submitButtonCLicked(event)
{
    event.preventDefault();

    let email=document.getElementById("email").value;

    
    let req=new XMLHttpRequest();
    req.open("POST","/resetPassword");

    req.setRequestHeader("Content-Type", "application/json");

    let data={email};
    req.addEventListener("load",function(res){
        if(req.responseText=='success')
        {
            let errormessage=document.getElementById("errormessage");
            errormessage.innerText="Password Reset Link Sent, Check Your Mail";
            errormessage.style.display="block";
            form.reset();
        }
        else{
            let errormessage=document.getElementById("errormessage");
            errormessage.innerText=req.responseText;
            errormessage.style.display="block";
        
        }
        setTimeout(removeErrorMessage,2000);
    });
    req.send(JSON.stringify(data));


}





let form=document.getElementById("resetPasswordform");
form.addEventListener("submit",submitButtonCLicked);