import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3333/api/',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization' : `Bearer ${localStorage.getItem('token')}`,
      'Access-Control-Allow-Origin': "*"
    }
    
  });

export default instance