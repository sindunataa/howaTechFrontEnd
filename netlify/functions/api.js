const axios = require('axios')

exports.handler = async (event) => {
  // Extract path
  let path = event.path.replace('/.netlify/functions/api', '')
  
  // Remove leading slash
  if (path.startsWith('/')) {
    path = path.substring(1)
  }
  
  // Construct full URL
  const backendUrl = `https://howa-technology.wuaze.com/api/v1/${path}`
  
  console.log('=== Request Info ===')
  console.log('Backend URL:', backendUrl)
  console.log('Method:', event.httpMethod)
  console.log('Query:', event.queryStringParameters)
  
  try {
    // Use CORS proxy to bypass DDoS-GUARD
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(backendUrl)}`
    
    console.log('Using CORS Proxy:', proxyUrl)
    
    const response = await axios({
      method: 'GET',
      url: proxyUrl,
      timeout: 30000,
    })
    
    console.log('Response status:', response.status)
    console.log('Response type:', typeof response.data)
    
    // Parse response
    let jsonData = response.data
    
    // If response is string, try to parse
    if (typeof jsonData === 'string') {
      try {
        jsonData = JSON.parse(jsonData)
      } catch (e) {
        console.error('Failed to parse JSON')
        
        return {
          statusCode: 503,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            success: false,
            error: 'Invalid response',
            message: 'Backend returned invalid JSON',
          }),
        }
      }
    }
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: JSON.stringify(jsonData),
    }
  } catch (error) {
    console.error('Error:', error.message)
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        requestedUrl: backendUrl,
      }),
    }
  }
}