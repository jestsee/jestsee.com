import { zValidator } from '@hono/zod-validator'
import type { APIRoute } from 'astro'
import { z } from 'astro/zod'
import { Hono } from 'hono'

import getLinkMetadata from './_services/linkMetadata'
import getMonkeytypeData from './_services/monkeytype'
import getSpotifyData from './_services/spotify'
import getGithubContributions from './_services/github/contributions'

const app = new Hono()
  .basePath('/api')
  .onError((error, c) => {
    console.error('error occured >>', error)
    return c.json({ error: 'Something went wrong' }, 500)
  })
  .get('/github-contributions', async (c) =>
    c.json(await getGithubContributions(), 200, {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=600'
    })
  )
  .get(
    '/link-metadata',
    zValidator('query', z.object({ url: z.string() })),
    async (c) => {
      const { url } = c.req.valid('query')

      return c.json(await getLinkMetadata(url))
    }
  )
  .get('/monkeytype', async (c) =>
    c.json(await getMonkeytypeData(), 200, {
      'Cache-Control': 's-maxage=43200, stale-while-revalidate=600'
    })
  )
  .get('/spotify', async (c) =>
    c.json(await getSpotifyData(), 200, {
      'Cache-Control': 's-maxage=8, stale-while-revalidate=2'
    })
  )

export const ALL: APIRoute = (context) => app.fetch(context.request)

export const prerender = false

export type APIType = typeof app
