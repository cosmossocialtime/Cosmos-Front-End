import { ReactNode } from 'react'
import DynamicHeader from './main-painel/DynamicHeader'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="flex min-h-screen w-full flex-col">
        <DynamicHeader />
        <main className="mt-[32px] flex w-full flex-col items-center px-4">
          {' '}
          {children}
        </main>
      </div>
    </div>
  )
}
