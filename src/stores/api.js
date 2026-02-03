// src/stores/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 30000, // Increase timeout karena ada proxy hop
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.baseURL + config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.data)
    return response.data
  },
  (error) => {
    console.error('API Error:', error)
    
    if (error.response) {
      console.error('Response status:', error.response.status)
      console.error('Response data:', error.response.data)
    }
    
    return Promise.reject(error)
  }
)

export default api