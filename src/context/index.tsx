import React from 'react'
import { AuthProvider } from './AuthProvider'
import { CalendarProvider } from './CalendarProvider'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <CalendarProvider>{children}</CalendarProvider>
    </AuthProvider>
  )
}
