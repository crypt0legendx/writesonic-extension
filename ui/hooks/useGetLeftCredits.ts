import { useQuery } from 'react-query'
import { LeftCreditsService } from 'services/LeftCreditsService'

export default function useGetVoices() {
  return useQuery('left-credits', () => LeftCreditsService.fetch(), {
    retry: 2,
  })
}
