import axios from 'axios';

const instance =axios.create({
    baseURL: 'https://react-my-burger-251f7-default-rtdb.firebaseio.com/'
});

export default instance;