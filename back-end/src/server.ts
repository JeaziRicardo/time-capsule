import fastify from 'fastify'

const app = fastify()
const PORT = 3001

app.get('/hello', () => {
  return 'Hello World!'
})

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`🚀 Server listening on http://localhost:${PORT}/`)
  })
