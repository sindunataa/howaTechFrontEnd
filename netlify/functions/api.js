const axios = require('axios')

exports.handler = async (event) => {
  console.log('=== Netlify Function Called ===')
  console.log('Event path:', event.path)
  console.log('Method:', event.httpMethod)
  
  // Extract path dengan benar
  // event.path bisa berisi:
  // - /.netlify/functions/api/company
  // - /api/company (via redirect)
  
  let apiPath = event.path
    .replace('/.netlify/functions/api', '')  // Remove function path
    .replace('/api', '')                      // Remove /api dari redirect
  
  // Ensure path starts with /
  if (!apiPath.startsWith('/')) {
    apiPath = '/' + apiPath
  }
  
  // Construct backend URL - PERHATIKAN: langsung ke /api/v1 tanpa duplikat
  const backendUrl = `https://howa-technology.wuaze.com/api/v1${apiPath}`
  
  console.log('Cleaned path:', apiPath)
  console.log('Backend URL:', backendUrl)
  console.log('Query params:', event.queryStringParameters)
  
  // Handle OPTIONS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
      body: '',
    }
  }
  
  try {
    // Parse body
    let requestBody = undefined
    if (event.body) {
      try {
        requestBody = JSON.parse(event.body)
      } catch {
        requestBody = event.body
      }
    }
    
    // Make request dengan headers yang lebih complete
    const response = await axios({
      method: event.httpMethod,
      url: backendUrl,
      data: requestBody,
      params: event.queryStringParameters || {},
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      validateStatus: () => true, // Accept semua status
      timeout: 30000,
    })
    
    console.log('Response status:', response.status)
    console.log('Response Content-Type:', response.headers['content-type'])
    
    // Check jika response adalah HTML (DDoS protection)
    const contentType = response.headers['content-type'] || ''
    const isJson = contentType.includes('application/json')
    const isHtml = contentType.includes('text/html') || 
                   (typeof response.data === 'string' && response.data.includes('<html>'))
    
    if (isHtml || !isJson) {
      console.error('Non-JSON response detected')
      console.error('Response preview:', typeof response.data === 'string' 
        ? response.data.substring(0, 300) 
        : JSON.stringify(response.data).substring(0, 300)
      )
      
      return {
        statusCode: 503,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: 'Backend DDoS Protection Active',
          message: 'Backend returned HTML instead of JSON. DDoS-GUARD protection is blocking the request.',
          backendUrl: backendUrl,
          statusCode: response.status,
          hint: 'Please ask backend admin to whitelist Netlify Functions or disable DDoS-GUARD for /api/v1/* endpoints',
        }),
      }
    }
    
    // Return successful JSON response
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
    console.error('=== Error ===')
    console.error('Message:', error.message)
    console.error('Code:', error.code)
    
    if (error.response) {
      console.error('Response status:', error.response.status)
      console.error('Response data:', error.response.data)
    }
    
    return {
      statusCode: error.response?.status || 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        code: error.code,
        backendUrl: backendUrl,
        responseStatus: error.response?.status,
        responseData: error.response?.data,
      }),
    }
  }
}