import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
import storage from './storage'

const defaultOptions = {
  timeOut: 2 * 60 * 1000,
  reconnectDelay: 6 * 1000,
  logLevel: LogLevel.Debug,
  accessTokenFactory: () => storage.get('token')
}

async function hubConnectionBuilder(url, options) {
  const config = Object.assign({}, defaultOptions, options)

  const connection = new HubConnectionBuilder()
    .withUrl(url, { accessTokenFactory: config.accessTokenFactory })
    .configureLogging(config.accessTokenFactory)
    .build()

  connection.serverTimeoutInMilliseconds = config.timeOut

  async function start() {
    if (!config.accessTokenFactory()) {
      return
    }
    try {
      await connection.start()
    } catch (err) {
      console.log(err)
      setTimeout(() => start(), config.reconnectDelay)
    }
  }

  connection.onclose(async () => {
    await start()
  })

  await start()

  return connection
}

export default hubConnectionBuilder
