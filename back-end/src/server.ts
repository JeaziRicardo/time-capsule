import fastify from 'fastify'
import 'dotenv/config'
import { memoriesRoutes } from './routes/memories'

const app = fastify()
const PORT = process.env.SERVER_PORT
  ? parseInt(process.env.SERVER_PORT, 10)
  : 3001

app.register(memoriesRoutes)

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`🚀 Server listening on http://localhost:${PORT}/`)
  })
