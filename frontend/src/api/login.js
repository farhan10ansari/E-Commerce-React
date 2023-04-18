import axios from 'axios';

const login =async (payload) => {

    return axios
    .post('http://localhost:3333/login',payload)
    
}

export default login;