import { GithubOutline as Github } from '@icons/GithubOutline'
import { Globe as Web } from '@icons/Globe'
import { Telegram } from '@icons/Telegram'
import { z } from 'astro/zod'

export const PROJECT_ICONS = { Github, Web, Telegram }

// this is workaround since we can't pass ICONS directly to z.enum
const keys = Object.keys(PROJECT_ICONS)
export const iconSchema = z.enum([keys[0], ...keys.slice(1)])

export type ProjectIcon = keyof typeof PROJECT_ICONS
