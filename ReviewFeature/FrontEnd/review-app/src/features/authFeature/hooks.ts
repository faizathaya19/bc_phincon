import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../../app/store'
import { setAccessToken, clearAccessToken } from './authSlice'
import { setProfile } from './profileSlice'
import type { UserProfile } from './types/user'

export const useAuthToken = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken)
  const dispatch = useDispatch<AppDispatch>()

  const saveToken = (token: string | null) => {
    if (token) dispatch(setAccessToken(token))
    else dispatch(clearAccessToken())
  }

  return { token, setAccessToken: saveToken }
}

export const useProfile = () => {
  const profile = useSelector((state: RootState) => state.profile.profile)
  const dispatch = useDispatch<AppDispatch>()

  const updateProfile = (profile: UserProfile | null) => {
    dispatch(setProfile(profile))
  }

  return { profile, setProfile: updateProfile }
}
