import React from 'react'
import { AuthProvider } from './AuthProvider'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>
}
