function removeErrorMessage()
{ 
    let errormessage=document.getElementById("errormessage");
    errormessage.innerText="";
    errormessage.style.display="none";
}
function passwordResetSuccess()
{
    let x=document.getElementById("formcontainer");
    x.innerHTML="<h1>Password Changed Successfully</h1>";
    let a=document.createElement("a");
    a.setAttribute("href","/");
    a.setAttribute("class","btn btn-primary mt-5");
    a.innerText="Go Home";
    x.appendChild(a);

}
function submitButtonCLicked(event)
{
    event.preventDefault();

    let newPassword=document.getElementById("password").value;
    let confirmPassword=document.getElementById("confirmpassword").value;


    // console.log(newPassword,confirmPassword);
    
    let req=new XMLHttpRequest();
    req.open("POST","/changePassword");

    req.setRequestHeader("Content-Type", "application/json");

    let data={newPassword,confirmPassword};
    req.addEventListener("load",function(res){
        if(req.responseText=='success')
        {
            // let errormessage=document.getElementById("errormessage");
            // errormessage.innerText="Password Changed Successfully";
            // errormessage.style.display="block";
            // form.reset();
            passwordResetSuccess()
        }
        else{
            let errormessage=document.getElementById("errormessage");
            errormessage.innerText="Error In Password Change";
            errormessage.style.display="block";
        
        }
        setTimeout(removeErrorMessage,2000);
    });
    req.send(JSON.stringify(data));

 
}





let form=document.getElementById("changePasswordForm");
form.addEventListener("submit",submitButtonCLicked);