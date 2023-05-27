import axios from 'axios'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(request.body)

    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    )

    const { access_token: accessToken } = accessTokenResponse.data

    const { data } = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const userSchema = z.object({
      id: z.number(),
      name: z.string(),
      login: z.string(),
      avatar_url: z.string().url(),
    })

    const {
      id: githubId,
      login,
      name,
      avatar_url: avatarUrl,
    } = userSchema.parse(data)

    let user = await prisma.user.findUnique({
      where: {
        githubId,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId,
          login,
          name,
          avatarUrl,
        },
      })
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: '30 days',
      },
    )

    return {
      token,
    }
  })
}
