import storage from './storage'

async function getJson(req) {
  try {
    return await req.json()
  } catch (err) {
    console.error('json serialization error', err)
    return null
  }
}

async function errorHandler(req, res) {
  if (!req.ok) {
    throw new Error((res && res.Message) || `${req.statusText} (${req.status})`)
  }
  return res
}

async function request({
  method,
  headers,
  url,
  data,
  bodyParser,
  errorHandler
}) {
  try {
    const options = {
      method,
      headers
    }
    if (data) {
      options.body = JSON.stringify(data)
    }
    const req = await fetch(url, options)
    const res = await bodyParser(req)
    const handled = await errorHandler(req, res)
    return handled
  } catch (err) {
    console.log(err)
    return err
  }
}

class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || process.env.REACT_APP_API_URL
    this.headers = new Headers()
    this.headers.append('Content-Type', 'application/json')
    this.bodyParser = getJson
    this.errorHandler = errorHandler
  }

  withToken(token) {
    if (!token) {
      token = storage.get('token')
    }
    if (typeof token === 'function') {
      token = token()
    }
    this.headers.delete('Authorization')
    if (token) {
      this.headers.set('Authorization', `Bearer ${token}`)
    }
    return this
  }

  withHeader(key, value) {
    this.headers.set(key, value)
    return this
  }

  withBodyParser(bodyParser) {
    this.bodyParser = bodyParser
    return this
  }

  withErrorHandler(errorHandler) {
    this.errorHandler = errorHandler
    return this
  }

  async get(url) {
    return await request({
      method: 'GET',
      headers: this.headers,
      url: this.baseUrl + url,
      bodyParser: this.bodyParser,
      errorHandler: this.errorHandler
    })
  }

  async post(url, data) {
    return await request({
      method: 'POST',
      headers: this.headers,
      url: this.baseUrl + url,
      data: data,
      bodyParser: this.bodyParser,
      errorHandler: this.errorHandler
    })
  }

  async put(url, data) {
    return await request({
      method: 'PUT',
      headers: this.headers,
      url: this.baseUrl + url,
      data: data,
      bodyParser: this.bodyParser,
      errorHandler: this.errorHandler
    })
  }

  async patch(url, data) {
    return await request({
      method: 'PATCH',
      headers: this.headers,
      url: this.baseUrl + url,
      data: data,
      bodyParser: this.bodyParser,
      errorHandler: this.errorHandler
    })
  }

  async delete(url) {
    return await request({
      method: 'DELETE',
      headers: this.headers,
      url: this.baseUrl + url,
      bodyParser: this.bodyParser,
      errorHandler: this.errorHandler
    })
  }
}

export default Api
