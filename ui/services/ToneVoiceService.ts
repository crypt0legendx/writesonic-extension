import { ToneVoice } from 'interfaces/ToneVoice.interface'
import api from 'utils/api'

export class ToneVoiceService {
  static async fetch(): Promise<ToneVoice[]> {
    const response = await api.get<ToneVoice[]>('/lists/tone-of-voices')
    return response.data
  }
}
