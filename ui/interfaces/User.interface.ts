export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  photo_url: string | null
  role: string
  language: string
  credits: {
    recurring_credits: number
    lifetime_deal_credits: number
    one_time_credits: number
    reward_credits: number
    is_unlimited: number
  }
}
