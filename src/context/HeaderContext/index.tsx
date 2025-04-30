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
  setShowMenu: (show: boolean) => void
  setShowOrganization: (show: boolean) => void
  setRoutes: (routes: Route[]) => void
  setUserName: (name: string | null) => void
  setOrganizationName: (name: string | null) => void
  resetHeader: () => void
}

const HeaderContext = createContext<HeaderContextType>({} as HeaderContextType)

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [showMenu, setShowMenu] = useState(false)
  const [showOrganization, setShowOrganization] = useState(false)
  const [routes, setRoutes] = useState<Route[]>([])
  const [userName, setUserName] = useState<string | null>(null)
  const [organizationName, setOrganizationName] = useState<string | null>(null)

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
        organizationName,
        setShowMenu,
        setShowOrganization,
        setRoutes,
        setUserName,
        setOrganizationName,
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
