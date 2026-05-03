import { Spotify } from '@icons/Spotify'
import useSWR from 'swr'

import client from '@/lib/client'
import { cn, fetcher } from '@/lib/utils'
import type { SpotifyData } from '@/pages/api/_services/spotify'

import BentoBadge from '../BentoBadge'

interface Props {
  initialData?: SpotifyData
}

const BentoItemNowPlaying = ({ initialData }: Props) => {
  const { data, error } = useSWR(
    'spotify',
    fetcher(() => client.api.spotify.$get()),
    {
      refreshInterval: 10000,
      fallbackData: initialData
    }
  )

  // TODO: handle initial error
  if (error && !data) return <p>masok error {JSON.stringify(data, null, 2)}</p>

  return (
    <a
      href={data?.songUrl}
      target='_blank'
      className={cn(
        'group relative flex h-full items-center gap-x-4 rounded-3xl p-5',
        'max-lg:p-6 md:max-lg:flex-col md:max-lg:items-start md:max-lg:justify-between'
      )}
    >
      <BentoBadge
        icon={Spotify}
        className={{
          component: 'absolute right-3 top-3',
          icon: 'transition-all duration-300 group-hover:text-green-400'
        }}
      />
      <div className='aspect-square h-full rounded-xl bg-black p-3 max-lg:h-3/5 max-md:min-w-24'>
        <div className='relative'>
          <img
            src={data?.albumImageUrl}
            alt='Last Played Song'
            className={cn('absolute aspect-square rounded-full', {
              'animate-[spin_5s_linear_infinite]': data?.isPlaying
            })}
          />
        </div>
      </div>
      <div className='w-full space-y-1 overflow-hidden tracking-wide'>
        <p className='text-sm text-slate-400'>
          {data?.isPlaying ? 'Now playing' : 'Last played'}
        </p>
        <div className='items-center gap-x-4 space-y-1 md:max-lg:flex'>
          <p className='max-w-full flex-shrink-0 overflow-hidden text-ellipsis whitespace-nowrap font-medium'>
            {data?.title}
          </p>
          <p className='overflow-hidden text-ellipsis whitespace-nowrap text-sm uppercase text-slate-400'>
            {data?.artist}
          </p>
        </div>
      </div>
    </a>
  )
}

export default BentoItemNowPlaying
