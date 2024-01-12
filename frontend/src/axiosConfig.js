import axios from 'axios';

//axios.defaults.baseURL =
//  process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : '/';

// It's because I deploy frontend and backend to different server.(static site and web service)
axios.defaults.baseURL =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:4000' : 'https://food-store-backend-mek5.onrender.com';