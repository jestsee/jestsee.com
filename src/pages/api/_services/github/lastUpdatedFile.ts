interface LastUpdatedTimeData {
  lastUpdatedTime: string
  latestCommitUrl: string
}

const getLastUpdatedTimeByFile = async (
  filePath: string
): Promise<LastUpdatedTimeData> => {
  const API_URL = `https://api.github.com/repos/jestsee/jestsee.com/commits?`

  const params = new URLSearchParams({
    path: `src/content/${filePath}`,
    per_page: '1'
  }).toString()

  const response = await fetch(API_URL + params, {
    headers: { Authorization: `Bearer ${import.meta.env.GITHUB_ACCESS_TOKEN}` }
  })

  const [data] = await response.json()

  return {
    lastUpdatedTime: data.commit.committer.date,
    latestCommitUrl: data.html_url
  }
}

export default getLastUpdatedTimeByFile
