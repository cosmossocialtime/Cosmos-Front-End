'use client'
import { ReactNode } from 'react'
import SideBar from './sideBar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <div className="flex overflow-x-hidden">
          <SideBar />
          <div className="grow">{children}</div>
        </div>
      </body>
    </html>
  )
}
