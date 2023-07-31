import * as Select from '@radix-ui/react-select'
import Image from 'next/image'
import { CaretDown, User, X } from 'phosphor-react'

import { UserProps } from '../../../types/user'

type attendee = {
  id: number
}

interface InputAttendeesProps {
  users: UserProps[]
  attendees?: attendee[]
  changeAttendees: (attendees: attendee[]) => void
}

export function InputAttendees({
  users,
  attendees = [],
  changeAttendees,
}: InputAttendeesProps) {
  function deleteSelectedAttendee(attendee: attendee) {
    let updateAttendees = [...attendees]
    updateAttendees = updateAttendees.filter(
      (upAttendee) => upAttendee !== attendee,
    )

    changeAttendees(updateAttendees)
  }

  function selectAttendee(value: string) {
    const user = users.find((user) => user.byname === value)

    if (user) {
      changeAttendees([...attendees, { id: user.id }])
    }
  }

  return (
    <Select.Root onValueChange={(value) => selectAttendee(value)}>
      <div className="flex w-full items-center justify-between gap-3 rounded-lg border border-solid border-white/40 bg-violet-600/50 px-2 py-2 text-sm focus-within:border-white ">
        <User size={24} />
        {attendees.length === 0 ? (
          <span className="flex-1 text-base text-white/40">
            Adicionar convidados
          </span>
        ) : (
          <div className="flex flex-1 flex-wrap gap-1">
            {attendees.map((attendeer) => (
              <span
                key={attendeer.id}
                className="flex items-center gap-1 rounded border border-solid border-white p-1"
              >
                {users.find((user) => user.id === attendeer.id)?.byname}
                <X
                  className="cursor-pointer"
                  onClick={() => deleteSelectedAttendee(attendeer)}
                />
              </span>
            ))}
          </div>
        )}
        <Select.Trigger>
          <CaretDown size={24} />
        </Select.Trigger>
      </div>
      <Select.Portal>
        <Select.Content
          side="left"
          sideOffset={4}
          position="popper"
          alignOffset={20}
          className="z-20 rounded bg-white text-center"
        >
          <Select.Viewport className="cursor-pointer p-2 text-violet-500">
            {users.map((user) => {
              return (
                !attendees.includes({ id: user.id }) && (
                  <Select.Item
                    key={user.id}
                    value={user.byname}
                    className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 hover:bg-violet-500 hover:text-white"
                  >
                    {user.profilePicture ? (
                      <Image
                        className="rounded-full"
                        alt="foto de usuário"
                        src={user.profilePicture}
                        width={32}
                        height={32}
                      />
                    ) : (
                      <User size={24} />
                    )}

                    <Select.ItemText>{user.byname}</Select.ItemText>
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
