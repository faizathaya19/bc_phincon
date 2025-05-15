import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { UserProfile } from '../types/user'

interface ProfileContextType {
  profile: UserProfile | null
  setProfile: (profile: UserProfile | null) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfileState] = useState<UserProfile | null>(null)

  // On mount, load profile from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('userProfile')
    if (stored) {
      try {
        const parsed: UserProfile = JSON.parse(stored)
        setProfileState(parsed)
      } catch {
        localStorage.removeItem('userProfile')
      }
    }
  }, [])

  const setProfile = (profile: UserProfile | null) => {
    if (profile) {
      localStorage.setItem('userProfile', JSON.stringify(profile))
    } else {
      localStorage.removeItem('userProfile')
    }
    setProfileState(profile)
  }

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}
