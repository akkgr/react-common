import storage from './storage'

async function getJson(req) {
  try {
    return await req.json()
  } catch (err) {
    console.error('json serialization error', err)
    return null
  }
}

async function errorHandler(res, body) {
  if (!res.ok) {
    throw new Error(
      (body && body.Message) || `${res.statusText} (${res.status})`
    )
  }
  return body
}

async function request({
  method,
  headers,
  url,
  data,
  bodyParser,
  errorHandler,
  signal
}) {
  try {
    const options = {
      method,
      headers,
      signal
    }
    const isJson = headers.get('Content-Type') === 'application/json'
    if (data) {
      options.body = isJson ? JSON.stringify(data) : data
    }
    const res = await fetch(url, options)
    const parsed = await bodyParser(res)
    const handled = await errorHandler(res, parsed)
    return handled
  } catch (err) {
    console.log(err)
    if (err.name === 'AbortError') {
      console.log('fetch aborted', url)
    }
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
    if (!value) {
      this.headers.delete(key)
      return this
    }
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

  async get(url, abortSignal) {
    return await request({
      method: 'GET',
      headers: this.headers,
      url: this.baseUrl + url,
      bodyParser: this.bodyParser,
      errorHandler: this.errorHandler,
      signal: abortSignal
    })
  }

  async post(url, data, abortSignal) {
    return await request({
      method: 'POST',
      headers: this.headers,
      url: this.baseUrl + url,
      data: data,
      bodyParser: this.bodyParser,
      errorHandler: this.errorHandler,
      signal: abortSignal
    })
  }

  async put(url, data, abortSignal) {
    return await request({
      method: 'PUT',
      headers: this.headers,
      url: this.baseUrl + url,
      data: data,
      bodyParser: this.bodyParser,
      errorHandler: this.errorHandler,
      signal: abortSignal
    })
  }

  async patch(url, data, abortSignal) {
    return await request({
      method: 'PATCH',
      headers: this.headers,
      url: this.baseUrl + url,
      data: data,
      bodyParser: this.bodyParser,
      errorHandler: this.errorHandler,
      signal: abortSignal
    })
  }

  async delete(url, abortSignal) {
    return await request({
      method: 'DELETE',
      headers: this.headers,
      url: this.baseUrl + url,
      bodyParser: this.bodyParser,
      errorHandler: this.errorHandler,
      signal: abortSignal
    })
  }
}

export default Api
