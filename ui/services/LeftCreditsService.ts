import { LeftCreditsDto } from 'interfaces/LeftCreditsDto.interface'
import api from 'utils/api'

export class LeftCreditsService {
  static async fetch(): Promise<LeftCreditsDto> {
    const response = await api.get<LeftCreditsDto>('/credit-v2/left-credits')
    return response.data
  }
}
