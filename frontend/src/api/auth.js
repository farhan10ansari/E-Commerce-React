import axios from "axios";

const checkAuth = (payload) => {
    return axios
    .post('http://localhost:3333/checkAuth',payload)

}
 
export default checkAuth;