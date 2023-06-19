import axios from 'axios'
export default axios.create({
  baseURL: 'https://cosmos.idatatecnologia.com/devcosmos',
  // baseURL: "http://localhost/cosmos/api",
  headers: {
    'Content-type': 'application/json',
    // "Authorization": `Bearer ${localStorage.getItem('token')}`
  },
})
