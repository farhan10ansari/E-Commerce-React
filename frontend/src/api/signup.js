import axios from 'axios';

const signup =async (payload) => {

    return axios
    .post('http://localhost:3333/signup',payload)
    
}

export default signup;