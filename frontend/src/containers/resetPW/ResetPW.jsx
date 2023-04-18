import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPW=({setUser,setIsLoggedIn,setIsPending})=>{
    const { token } = useParams();
    console.log(token);

    const [resMessage,setResMessage]=useState("Verifying Token.....");

    const navigate=useNavigate();

    useEffect(()=>{
        verifyToken(token);

    },[])

    const verifyToken=(token)=>{

        fetch("http://localhost:3333/verifyToken",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({token})


        }).then((res)=>{
            if(res.status==200)
            {
                return res.json();
            }
            else{
                throw res;
            }
        }).then((data)=>{
            console.log(data);
            localStorage.setItem('accessToken',data.accessToken);
            localStorage.setItem('user',JSON.stringify(data.user));
            setUser(data.user);
            setIsLoggedIn(true);
            setIsPending(false);
            navigate('/changePassword');
            // location.reload();
            

        }).catch(async (err)=>{
            console.log(err);
            let error=await err.json();
            setResMessage(error);

        })
    }

    


    return (
        <div className="text-center"><h1>{resMessage}</h1></div>
    )

}

export default ResetPW;