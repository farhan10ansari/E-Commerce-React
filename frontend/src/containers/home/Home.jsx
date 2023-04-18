import UserHome from "./UserHome";
import SellerHome from "./SellerHome";
import AdminHome from "./AdminHome";


const Home = ({user}) => {

    return (
        <>

            {
                user.usertype=='user' ? <UserHome user={user}/> : 
                <>
                {
                    user.usertype=='seller' ? <SellerHome user={user}/> : 
                    <>
                    {
                        user.usertype=='admin' ? <AdminHome user={user}/> : <></>
                    }
                    </>
                }
                </>

            }
            

            


        </>
    );
}

export default Home;
