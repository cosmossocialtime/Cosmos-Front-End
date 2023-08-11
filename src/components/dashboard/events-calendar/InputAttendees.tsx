import * as Select from '@radix-ui/react-select'
import Image from 'next/image'
import { CaretDown, User, X } from 'phosphor-react'

import { useCalendar } from '../../../context/CalendarProvider'

interface InputAttendeesProps {
  attendeesId?: number[]
  changeAttendeesId: (attendeesId: number[]) => void
}

export function InputAttendees({
  attendeesId = [],
  changeAttendeesId,
}: InputAttendeesProps) {
  const { users, ownerUser } = useCalendar()

  function deleteSelectedAttendee(attendee: number) {
    let updateAttendeesId = [...attendeesId]
    updateAttendeesId = updateAttendeesId.filter(
      (upAttendee) => upAttendee !== attendee,
    )

    changeAttendeesId(updateAttendeesId)
  }
  const companions = users.filter((user) => user.userId !== ownerUser.id)

  function selectAttendee(value: string) {
    const companion = companions.find((companion) => companion.byname === value)

    if (companion) {
      changeAttendeesId([...attendeesId, companion.userId])
    }
  }

  return (
    <Select.Root onValueChange={(value) => selectAttendee(value)}>
      <div className="relative flex w-full items-center gap-3 overflow-hidden rounded-lg border border-solid border-white/40 bg-violet-600/50">
        <User size={24} className="absolute left-2 " />
        {attendeesId.length === 0 ? (
          <span className="absolute -z-10 ml-10 text-base text-white/40">
            Adicionar convidados
          </span>
        ) : (
          <div className="absolute left-10 flex flex-wrap gap-1">
            {attendeesId.map((attendeerId) => (
              <span
                key={attendeerId}
                className="flex items-center gap-1 px-1 py-2 hover:bg-black/5"
              >
                {
                  companions.find(
                    (companion) => companion.userId === attendeerId,
                  )?.byname
                }
                <X
                  className="cursor-pointer"
                  onClick={() => deleteSelectedAttendee(attendeerId)}
                />
              </span>
            ))}
          </div>
        )}
        <Select.Trigger className="flex flex-1 justify-end p-2 text-sm">
          <CaretDown size={24} />
        </Select.Trigger>
      </div>
      <Select.Portal>
        <Select.Content
          side="bottom"
          position="popper"
          className="z-10 bg-white text-center"
        >
          <Select.Viewport className="cursor-pointer text-violet-500">
            {companions.map((companion) => {
              return (
                !attendeesId.includes(companion.userId) && (
                  <Select.Item
                    key={companion.id}
                    value={companion.byname}
                    className="flex items-center justify-between gap-3 px-2 py-2 transition-colors hover:bg-violet-500 hover:text-white"
                  >
                    {companion.profilePicture ? (
                      <Image
                        className="rounded-full"
                        alt="foto de usuário"
                        src={companion.profilePicture}
                        width={32}
                        height={32}
                      />
                    ) : (
                      <User size={24} />
                    )}

                    <Select.ItemText>{companion.byname}</Select.ItemText>
                  </Select.Item>
                )
              )
            })}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
