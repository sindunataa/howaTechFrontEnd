const axios = require('axios')

// Store untuk menyimpan cookies per session
const cookieStore = new Map()

exports.handler = async (event) => {
  // Extract path setelah /.netlify/functions/api
  let path = event.path.replace('/.netlify/functions/api', '')
  
  // Remove leading slash if exists
  if (path.startsWith('/')) {
    path = path.substring(1)
  }
  
  // Construct full URL ke backend Laravel
  const url = `https://howa-technology.wuaze.com/api/v1/${path}`
  
  console.log('=== Netlify Function Debug ===')
  console.log('Original path:', event.path)
  console.log('Cleaned path:', path)
  console.log('Full URL:', url)
  console.log('Method:', event.httpMethod)
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

    // Get stored cookies
    const storedCookies = cookieStore.get('ddos-guard') || ''

    // Make request to Laravel backend with enhanced headers
    const response = await axios({
      method: event.httpMethod,
      url: url,
      data: requestBody,
      params: event.queryStringParameters || {},
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0',
        'Cookie': storedCookies,
      },
      validateStatus: () => true,
      timeout: 30000,
      maxRedirects: 0, // Don't follow redirects
    })

    console.log('Response Status:', response.status)
    console.log('Response Headers:', response.headers)
    
    // Store cookies if present
    if (response.headers['set-cookie']) {
      const cookies = Array.isArray(response.headers['set-cookie']) 
        ? response.headers['set-cookie'].join('; ')
        : response.headers['set-cookie']
      cookieStore.set('ddos-guard', cookies)
      console.log('Stored cookies:', cookies)
    }

    // Check if response is HTML (DDoS protection page)
    const contentType = response.headers['content-type'] || ''
    const isHtml = contentType.includes('text/html') || 
                   (typeof response.data === 'string' && response.data.includes('<html>'))
    
    if (isHtml) {
      console.error('HTML response detected - DDoS protection active')
      console.error('Response data preview:', response.data.substring(0, 200))
      
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
          error: 'Backend DDoS Protection Active',
          message: 'The backend server (howa-technology.wuaze.com) has DDoS-GUARD protection enabled that is blocking automated requests. Please contact the backend administrator to whitelist Netlify or disable protection for API endpoints.',
          requestedUrl: url,
          suggestion: 'Ask backend admin to whitelist these IPs or disable DDoS-GUARD for /api/v1/* endpoints',
        }),
      }
    }

    // Check if response is valid JSON
    let responseData = response.data
    if (typeof responseData === 'string') {
      try {
        responseData = JSON.parse(responseData)
      } catch (e) {
        console.error('Failed to parse response as JSON')
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
      body: JSON.stringify(responseData),
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
        requestedUrl: url,
      }),
    }
  }
}