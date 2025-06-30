import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import {
  clearFormData,
  getFormData,
  saveFormData,
} from '../../utils/localStorage'

interface Route {
  label: string
  href: string
}

interface HeaderContextType {
  showMenu: boolean
  showOrganization: boolean
  routes: Route[]
  userName: string | null
  organizationName: string | null
  socialOrganizationId: number | null
  profilePicture: string | null
  setShowMenu: (show: boolean) => void
  setShowOrganization: (show: boolean) => void
  setRoutes: (routes: Route[]) => void
  setUserName: (name: string | null) => void
  setProfilePicture: (picture: string | null) => void
  setOrganizationName: (name: string | null) => void
  setSocialOrganizationId: (id: number | null) => void
  resetHeader: () => void
}

const HeaderContext = createContext<HeaderContextType>({} as HeaderContextType)

const LOCAL_STORAGE_KEY = 'cosmos.header'

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [showMenu, setShowMenu] = useState(false)
  const [showOrganization, setShowOrganization] = useState(false)
  const [routes, setRoutes] = useState<Route[]>([])
  const [userName, setUserName] = useState<string | null>(null)
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [organizationName, setOrganizationName] = useState<string | null>(null)
  const [socialOrganizationId, setSocialOrganizationId] = useState<
    number | null
  >(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = getFormData(LOCAL_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setShowMenu(parsed.showMenu ?? false)
        setShowOrganization(parsed.showOrganization ?? false)
        setRoutes(parsed.routes ?? [])
        setUserName(parsed.userName ?? null)
        setProfilePicture(parsed.profilePicture ?? null)
        setOrganizationName(parsed.organizationName ?? null)
        setSocialOrganizationId(parsed.socialOrganizationId ?? null)
      }
    } catch (err) {
      console.warn('Erro ao reidratar header:', err)
    } finally {
      setIsHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    const stateToPersist = {
      showMenu,
      showOrganization,
      routes,
      userName,
      profilePicture,
      organizationName,
      socialOrganizationId,
    }
    saveFormData(LOCAL_STORAGE_KEY, JSON.stringify(stateToPersist))
  }, [
    isHydrated,
    showMenu,
    showOrganization,
    routes,
    userName,
    profilePicture,
    organizationName,
    socialOrganizationId,
  ])

  const resetHeader = () => {
    setShowMenu(false)
    setShowOrganization(false)
    setRoutes([])
    setUserName(null)
    setProfilePicture(null)
    setOrganizationName(null)
    setSocialOrganizationId(null)
    clearFormData(LOCAL_STORAGE_KEY)
  }

  return (
    <HeaderContext.Provider
      value={{
        showMenu,
        showOrganization,
        routes,
        userName,
        profilePicture,
        organizationName,
        socialOrganizationId,
        setShowMenu,
        setShowOrganization,
        setRoutes,
        setUserName,
        setProfilePicture,
        setOrganizationName,
        setSocialOrganizationId,
        resetHeader,
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}

export function useHeader() {
  return useContext(HeaderContext)
}
