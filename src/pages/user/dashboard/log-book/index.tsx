import SideBar from '../sideBar'
import { CardEvent } from '../../../../components/dashboard/log-book/CardEvent'
import { useEffect, useState } from 'react'
import { EventProps } from '../../../../types/event'
import { api } from '../../../../services/api'
import { useDashboard } from '../../../../hooks/useDashboard'
import { Loading } from '../../../../components/Loading'

export default function LogBook() {
  const { dashboard } = useDashboard()
  const currentMentorship = dashboard?.currentMentorship

  const [events, setEvents] = useState<EventProps>([])

  useEffect(() => {
    if (!currentMentorship) {
      return
    }
    api.get('').then(response => {
      if(response.status === 200) {
        setEvents(response.data)
      }}).catch(error => {
        console.error(error)
      })
    })
  }, [currentMentorship])

  if (!currentMentorship) {
    return <Loading />
  }

  return (
    <div className="flex h-screen w-screen">
      <SideBar />
      <div className="flex h-full flex-1 flex-col">
        <header className="px-20 py-8 shadow-lg">
          <h1 className="text-[2.5rem] font-semibold leading-[120%] text-gray-600">
            Diário de bordo
          </h1>
        </header>

        <div className="mx-20 mb-24 mt-8 flex-1 overflow-y-auto pr-16">
          <h2 className="mb-4 font-bold text-gray-500">Agosto 2022</h2>
          <div className="flex flex-col gap-4">
            <CardEvent />
            <CardEvent />
            <CardEvent />
            <CardEvent />
            <CardEvent />
          </div>
        </div>
      </div>
    </div>
  )
}
