import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-build-11e2b.firebaseio.com'
});

export default instance; 