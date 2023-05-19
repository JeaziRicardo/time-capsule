import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const app = fastify()
const prisma = new PrismaClient()
const PORT = process.env.SERVER_PORT
  ? parseInt(process.env.SERVER_PORT, 10)
  : 3001

app.get('/users', async () => {
  const users = await prisma.user.findMany()

  return users
})

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`🚀 Server listening on http://localhost:${PORT}/`)
  })
