const axios = require('axios')

exports.handler = async (event) => {
  // Extract path setelah /.netlify/functions/api
  const path = event.path.replace('/.netlify/functions/api', '')
  
  // Construct full URL ke backend Laravel
  const url = `https://howa-technology.wuaze.com/api/v1${path}`
  
  console.log('=== Netlify Function Debug ===')
  console.log('Method:', event.httpMethod)
  console.log('Path:', path)
  console.log('Full URL:', url)
  console.log('Query:', event.queryStringParameters)
  
  try {
    // Parse body jika ada
    let requestBody = undefined
    if (event.body) {
      try {
        requestBody = JSON.parse(event.body)
      } catch {
        requestBody = event.body
      }
    }

    // Make request to Laravel backend
    const response = await axios({
      method: event.httpMethod,
      url: url,
      data: requestBody,
      params: event.queryStringParameters || {},
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Netlify-Function-Proxy',
      },
      validateStatus: () => true, // Accept any status code
      timeout: 30000, // 30 seconds timeout
    })

    console.log('Response Status:', response.status)
    
    // Check if response is HTML (DDoS protection page)
    const contentType = response.headers['content-type'] || ''
    const isHtml = contentType.includes('text/html') || 
                   (typeof response.data === 'string' && response.data.includes('<html>'))
    
    if (isHtml && response.status !== 200) {
      console.error('HTML response detected - likely DDoS protection')
      return {
        statusCode: 503,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        body: JSON.stringify({
          success: false,
          error: 'Backend protection detected',
          message: 'The backend server has DDoS protection enabled.',
        }),
      }
    }

    // Return successful response
    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: JSON.stringify(response.data),
    }
  } catch (error) {
    console.error('=== Proxy Error ===')
    console.error('Error message:', error.message)
    
    if (error.response) {
      console.error('Response status:', error.response.status)
      console.error('Response data:', error.response.data)
    }
    
    return {
      statusCode: error.response?.status || 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        details: error.response?.data || 'No additional details',
        url: url,
      }),
    }
  }
}