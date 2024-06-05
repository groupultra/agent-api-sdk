import http from '@/lib/http'

type ONBOARDING_PROGRESS = 'un_start'
export type CURRENTUSERINFO = {
  context: {
    avatar: string
    description: string
    name: string
  }
  email: string
  email_verified: boolean
  user_id: string
  system_context: {
    onboarding: {
      progress: ONBOARDING_PROGRESS
    }
  }
}

export const RequestCurrentUserInfo = async () => {
  return http.get<CURRENTUSERINFO>('/user/info')
}

export const RequestUpdateCurrentUserInfo = async (params: {
  avatar?: string
}) => {
  return http.post('/user/info', params)
}

export const getUserProfile = async (character_list: string[]) => {
  return http.post('/character/fetch_profile', {character_list})
}
