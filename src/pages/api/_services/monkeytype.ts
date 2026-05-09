import type { MonkeyTypeData } from '@/types'

const mapResponse = (response: any) => {
  return Object.entries(response.data).flatMap(([time, records]) => {
    return (records as any[]).map((record: any) => ({
      ...record,
      time: Number(time)
    }))
  })
}

const getMonkeytypeData = async (): Promise<MonkeyTypeData> => {
  const API_KEY = import.meta.env.MONKEYTYPE_API_KEY
  const response = await fetch(
    'https://api.monkeytype.com/users/personalBests?mode=time',
    { headers: { Authorization: `ApeKey ${API_KEY}` } }
  )

  const responseJSON = await response.json()
  const data = mapResponse(responseJSON)

  const bestScore = data.reduce((max, item) => {
    return item.wpm > max.wpm ? item : max
  }, data[0])

  return {
    acc: Math.round(bestScore.acc),
    consistency: Math.round(bestScore.consistency),
    language: bestScore.language,
    time: bestScore.time,
    wpm: Math.round(bestScore.wpm)
  }
}

export default getMonkeytypeData
