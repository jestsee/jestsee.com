// Keep archive API and social-image URLs independent of Vercel's primary-domain setting.
export const BASE_URL = import.meta.env.DEV
  ? 'http://localhost:4321'
  : import.meta.env.SITE
