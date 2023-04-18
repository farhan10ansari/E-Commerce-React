import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import checkAuth from './api/auth';

import Navbar from "./components/navbar/Navbar";

import Home from './containers/home/Home'
import LoginPage from './containers/login/Login';
import SignupPage from './containers/signup/Signup';
import AddProduct from './containers/addProduct/AddProduct';
import ChangePassword from "./containers/changePassword/ChangePassword";
import Cart from './containers/cart/Cart';
import UserOrders from "./containers/userOrders/UserOrders";
import SellerOrders from "./containers/sellerOrders/SellerOrders";
import ForgetPassword from "./containers/forgetPassword/ForgetPassword";
import ResetPW from "./containers/resetPW/ResetPW";



import { Routes, Route, useNavigate } from 'react-router-dom';



function App() {

  const [user,setUser]=useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const navigate=useNavigate()


  const checkAuthorization = async () => {
    setIsPending(true);
    let accessToken=localStorage.getItem("accessToken");
    if(!accessToken)
    {
      setIsLoggedIn(false);
      setIsPending(false);
      navigate("/login");

    }


    try{
      let result=await checkAuth({accessToken});
      if(result.data=='success')
      {
        setIsLoggedIn(true);
        setIsPending(false);
      }
      else{
        setIsLoggedIn(false);
        setIsPending(false);
      }
    }
    catch(error)
    {
      // console.log(error);
      setIsLoggedIn(false);
      setIsPending(false)
    }

  }

  


  useEffect(() => {
    checkAuthorization();
    let user=JSON.parse(localStorage.getItem("user"));
    // console.log(user);
    setUser(user);

  },[])



  const logout=()=>{
    setIsLoggedIn(false);
    setIsPending(false);
    localStorage.clear();
    navigate("/login");

  }





  return (
    <>
    {isLoggedIn && <Navbar name={user.name} username={user.username} usertype={user.usertype} logout={logout}/>}

    <Routes>

      {
        isLoggedIn ?
          <> 
            <Route path="/changePassword" element={<ChangePassword user={user}/>} />

            {
                user.usertype=='user' &&
                <>
                  <Route path="/cart" element={<Cart user={user}/>} />
                  <Route path="/orders" element={<UserOrders user={user}/>} />

                </>
            }

            {
                user.usertype=='seller' &&
                <>
                  <Route path="/addProduct" element={<AddProduct user={user}/>} />
                  <Route path="/orders" element={<SellerOrders user={user}/>} />

                </>
            }

            {
                user.usertype=='admin' &&
                <>
                  <Route path="/addProduct" element={<AddProduct user={user}/>} />

                </>
            } 

            <Route path="*" element={<Home  user={user}/>} />

          </> : isPending ? <Route path="*" element={<h1>Loading...</h1>} /> :
          <>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="*" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} setIsPending={setIsPending}/>} />

          </>

      }
            <Route path="/resetPW/:token" element={<ResetPW setIsLoggedIn={setIsLoggedIn} setUser={setUser} setIsPending={setIsPending}/>} />




    </Routes>
    </>

  )
}

export default App
