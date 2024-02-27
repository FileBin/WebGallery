const { env } = require('process');

const PROXY_CONFIG = [
  {
    context: [
      "/api/**",
    ],
    proxyTimeout: 10000,
    target: 'http://localhost:5294',
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
