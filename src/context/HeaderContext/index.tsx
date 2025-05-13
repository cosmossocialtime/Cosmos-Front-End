import { createContext, useContext, useState, ReactNode } from 'react'

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

  const resetHeader = () => {
    setShowMenu(false)
    setShowOrganization(false)
    setRoutes([])
    setUserName(null)
    setOrganizationName(null)
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
