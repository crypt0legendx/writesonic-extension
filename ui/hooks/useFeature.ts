import { useQuery } from 'react-query'
import { FeatureService } from 'services/FeatureService'

export default function useFeature(
  text: string,
  feature: string,
  voice: string
) {
  return useQuery(
    `${text}-${feature}-${voice}`,
    () => FeatureService.fetch(text, feature, voice),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: 2,
      enabled:
        text.split(' ').length > 5 && feature.length > 3 && voice.length > 3,
    }
  )
}
