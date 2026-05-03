// @ts-check
import mdx from '@astrojs/mdx'
import node from '@astrojs/node'
import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel'
import { defineConfig, envField } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import lottie from 'astro-integration-lottie'

let adapter = vercel()

if (process.argv[3] === '--node' || process.argv[4] === '--node') {
  adapter = node({ mode: 'standalone' })
}

// https://astro.build/config
export default defineConfig({
  adapter,
  output: 'static',
  site: 'https://jestsee.com',

  markdown: {
    shikiConfig: {
      theme: 'poimandres'
    },
    syntaxHighlight: 'shiki'
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'load'
  },

  env: {
    schema: {
      MAPTILER_API_KEY: envField.string({
        context: 'server',
        access: 'secret'
      }),
      GITHUB_ACCESS_TOKEN: envField.string({
        context: 'server',
        access: 'secret'
      }),
      SPOTIFY_CLIENT_ID: envField.string({
        context: 'server',
        access: 'secret'
      }),
      SPOTIFY_CLIENT_SECRET: envField.string({
        context: 'server',
        access: 'secret'
      }),
      SPOTIFY_REFRESH_TOKEN: envField.string({
        context: 'server',
        access: 'secret'
      }),
      MONKEYTYPE_API_KEY: envField.string({
        context: 'server',
        access: 'secret'
      }),

      PUBLIC_VERCEL_ENV: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: 'development'
      }),
      PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true
      }),
      PUBLIC_VERCEL_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true
      })
    }
  },

  vite: {
    ssr: {
      noExternal: ['path-to-regexp', 'react-tweet']
    }
  },

  integrations: [
    mdx({
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            headingProperties: {
              class: 'article-heading'
            }
          }
        ]
      ]
    }),
    (await import('@playform/compress')).default({
      HTML: {
        'html-minifier-terser': {
          collapseWhitespace: false
        }
      }
    }),
    lottie(),
    sitemap(),
    react(),
    tailwind({
      applyBaseStyles: false
    }),
    partytown()
  ]
})
