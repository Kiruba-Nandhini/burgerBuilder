import Axios from 'axios';


 const instance = Axios.create({
    baseURL :'https://react-burger-builder-fcf37.firebaseio.com/'
});

export default instance;