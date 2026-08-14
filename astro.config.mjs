// @ts-check
import { unified } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import node from '@astrojs/node'
import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import playformCompress from '@playform/compress'
import { defineConfig, envField } from 'astro/config'
import lottie from 'astro-integration-lottie'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

let adapter = vercel()

if (process.argv[3] === '--node' || process.argv[4] === '--node') {
  adapter = node({ mode: 'standalone' })
}

// https://astro.build/config
export default defineConfig({
  adapter,
  output: 'static',
  site: 'https://jestsee.com',
  compressHTML: true,

  markdown: {
    processor: unified({
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
    validateSecrets: true,
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
    build: {
      cssTarget: ['chrome111', 'edge111', 'firefox114', 'safari16.4', 'ios16.4']
    },
    resolve: {
      noExternal: ['path-to-regexp', 'react-tweet']
    }
  },

  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vercel.com'
      },
      {
        protocol: 'https',
        hostname: 'assets.vercel.com'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  },

  integrations: [
    mdx(),
    lottie(),
    sitemap(),
    react(),
    partytown(),
    playformCompress({
      HTML: false
    })
  ]
})
