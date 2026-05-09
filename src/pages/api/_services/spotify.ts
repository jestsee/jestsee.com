import queryString from 'query-string'

const BASE_URL = 'https://api.spotify.com/v1/me/player'

type AccessToken = { access_token: string }
const getAccessToken = async (): Promise<AccessToken> => {
  const clientId = import.meta.env.SPOTIFY_CLIENT_ID
  const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  })

  return response.json()
}

const getAccessTokenHeader = (accessToken: string) => {
  return { headers: { Authorization: `Bearer ${accessToken}` } }
}

const getNowPlayingResponse = async (accessToken: string) => {
  return fetch(
    `${BASE_URL}/currently-playing`,
    getAccessTokenHeader(accessToken)
  )
}

const mapSpotifyData = (track: any) => {
  return {
    songUrl: track.external_urls.spotify as string,
    title: track.name as string,
    albumImageUrl: track.album.images[0].url as string,
    artist: track.artists
      .map((artist: { name: any }) => artist.name)
      .join(', ') as string
  }
}

const getRecentlyPlayed = async (accessToken: string) => {
  const response = await fetch(
    `${BASE_URL}/recently-played?limit=1`,
    getAccessTokenHeader(accessToken)
  )

  const {
    items: [{ track }]
  } = await response.json()

  return { isPlaying: false, ...mapSpotifyData(track) }
}

const getSpotifyData = async () => {
  const tokenData = await getAccessToken()

  const { access_token } = tokenData

  const nowPlayingResponse = await getNowPlayingResponse(access_token)

  if (nowPlayingResponse.status === 204) {
    return getRecentlyPlayed(access_token)
  }

  const { item: track } = await nowPlayingResponse.json()

  return { isPlaying: true, ...mapSpotifyData(track) }
}

export type SpotifyData = ReturnType<typeof mapSpotifyData> & {
  isPlaying: boolean
}

export default getSpotifyData
