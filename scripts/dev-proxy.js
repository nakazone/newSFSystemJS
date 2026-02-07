#!/usr/bin/env node
/**
 * Proxy de desenvolvimento: uma nica porta (3000) para acessar tudo.
 * - http://localhost:3080         -> landing (app na porta 8000)
 * - http://localhost:3080/system -> sistema CRM (app na porta 8001)
 *
 * Uso: npm run dev (sobe landing + system + proxy)
 */

const http = require('http')
const PROXY_PORT = parseInt(process.env.PROXY_PORT || '3080', 10)
const LANDING_PORT = 8000
const SYSTEM_PORT = 8001

function proxyRequest(clientReq, clientRes, targetPort) {
  const opts = {
    hostname: 'localhost',
    port: targetPort,
    path: clientReq.url,
    method: clientReq.method,
    headers: clientReq.headers,
  }
  const proxyReq = http.request(opts, (proxyRes) => {
    clientRes.writeHead(proxyRes.statusCode, proxyRes.headers)
    proxyRes.pipe(clientRes, { end: true })
  })
  proxyReq.on('error', (e) => {
    clientRes.writeHead(502, { 'Content-Type': 'text/plain' })
    clientRes.end(`Proxy error: ${e.message}. O app na porta ${targetPort} est rodando?`)
  })
  clientReq.pipe(proxyReq, { end: true })
}

const server = http.createServer((req, res) => {
  const path = req.url?.split('?')[0] || ''
  const targetPort = path.startsWith('/system') ? SYSTEM_PORT : LANDING_PORT
  proxyRequest(req, res, targetPort)
})

server.listen(PROXY_PORT, () => {
  console.log('')
  console.log('  Proxy rodando em http://localhost:' + PROXY_PORT)
  console.log('  - Landing:  http://localhost:' + PROXY_PORT + '/')
  console.log('  - Sistema:  http://localhost:' + PROXY_PORT + '/system')
  console.log('  - Login:    http://localhost:' + PROXY_PORT + '/system/login')
  console.log('')
})

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error('Porta ' + PROXY_PORT + ' em uso. Libere a porta ou edite PROXY_PORT em scripts/dev-proxy.js.')
  } else {
    console.error(e)
  }
  process.exit(1)
})
