import { Copy } from 'interfaces/FeatureDto.interface'
import api from 'utils/api'

interface IFeature {
  language: string
  tone_of_voice: string
  content_to_rephrase?: string
  content_to_expand?: string
  content_to_shorten?: string
}

export class FeatureService {
  static async fetch(
    text: string,
    type: string,
    voice: string
  ): Promise<Copy[]> {
    let url = ''

    const featureObj: IFeature = {
      language: 'en',
      tone_of_voice: voice,
    }

    switch (type) {
      case 'rephrase':
        url = '/extension/content/content-rephrase'
        featureObj['content_to_rephrase'] = text
        break
      case 'expand':
        url = '/extension/content/sentence-expand'
        featureObj['content_to_expand'] = text
        break
      case 'shorten':
        url = '/extension/content/content-shorten'
        featureObj['content_to_shorten'] = text
        break
      default:
        break
    }
    ;``

    const response = await api.post<Copy[]>(url, featureObj)
    return response.data
  }
}
