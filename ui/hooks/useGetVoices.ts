import { useQuery } from 'react-query'
import { ToneVoiceService } from 'services/ToneVoiceService'

export default function useGetVoices() {
  return useQuery('voices', () => ToneVoiceService.fetch(), {
    retry: 2,
  })
}
