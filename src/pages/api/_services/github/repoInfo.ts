import request from 'graphql-request'

import { GetRepoInfo } from '@/lib/graphql'
import type { GithubRepositoryLastUpdated } from '@/types'

const getLastUpdatedTime = async (
  owner: string,
  repository: string
): Promise<GithubRepositoryLastUpdated> => {
  const response = await request({
    url: 'https://api.github.com/graphql',
    document: GetRepoInfo,
    variables: { username: owner, repositoryName: repository },
    requestHeaders: {
      Authorization: `Bearer ${import.meta.env.GITHUB_ACCESS_TOKEN}`
    }
  })

  return (response as any).repository
}

export default getLastUpdatedTime
