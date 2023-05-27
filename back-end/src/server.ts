import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import 'dotenv/config'
import fastify from 'fastify'
import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'

const PORT = process.env.SERVER_PORT
  ? parseInt(process.env.SERVER_PORT, 10)
  : 3001

const app = fastify()

app.register(cors, {
  origin: true,
})
app.register(jwt, {
  secret: String(process.env.JWT_SECRET),
})

app.register(authRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`🚀 Server listening on http://localhost:${PORT}/`)
  })
