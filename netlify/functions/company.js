export async function handler(event) {
  // Ambil path setelah /.netlify/functions/api
  const path = event.path.replace('/.netlify/functions/api', '')

  // Bangun URL ke backend Laravel
  const targetUrl = `http://howa-technology.wuaze.com${path}`

  const res = await fetch(targetUrl, {
    method: event.httpMethod,
    headers: {
      'Content-Type': 'application/json',
      // forward Authorization kalau ada
      ...(event.headers.authorization && {
        Authorization: event.headers.authorization,
      }),
    },
  })

  const data = await res.text()

  return {
    statusCode: res.status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: data,
  }
}
