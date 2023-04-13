const { v4: uuidv4 } = require('uuid');

import * as Popover from "@radix-ui/react-popover"
import * as Select from "@radix-ui/react-select"

import { FormEvent, useState } from "react"
import { CaretDown, User, X } from "phosphor-react"
import dayjs from "dayjs"
import Image from "next/image"

type personProps = {
  id: string,
  name: string,
  perfilLink: string,
  office: string,
  selected: boolean
}

const people: Array<personProps> = [
  {
    id: uuidv4(),
    name: "Érick Henrique",
    perfilLink: "/images/papelMissao/comandante.png",
    office: "Comandante",
    selected: false,
  },
  {
    id: uuidv4(),
    name: "Gabriel dos Santos",
    perfilLink: "/images/papelMissao/especialista.png",
    office: "Especialista",
    selected: false,
  },
  {
    id: uuidv4(),
    name: "Amanda Sales",
    perfilLink: "/images/papelMissao/piloto.png",
    office: "Piloto",
    selected: false,
  },
  {
    id: uuidv4(),
    name: "Rodrigo Fazoli",
    perfilLink: "/images/papelMissao/especialista.png",
    office: "Especialista",
    selected: false,
  }

]
interface MeetingDataProps {
  title?: string;
  currentDay: dayjs.Dayjs;
  hourStart?: string;
  hourEnd?: string;
  description?: string;
  guests?: Array<personProps>;
  linkMeeting?: string;
}

export default function PopoverForMarkMeeting({ currentDay, guests = [] }: MeetingDataProps) {
  const [show, setShow] = useState<boolean>(false)
  const [localGuests, setLocalGuests] = useState(guests)

  const [selectContent, setSelectContent] = useState("")
  const handleClose = (state: boolean) => {
    setShow(state)
  }

  function addGuest(person: personProps) {
    setLocalGuests(prevLocalGuest => {
      const updatedGuests = [...prevLocalGuest, person];

      return updatedGuests;
    })


  }
  function removeGuest(person: personProps) {
    setLocalGuests(prevLocalGuest => {
      const updatedGuests = prevLocalGuest.filter(guest => guest !== person)

      return updatedGuests;
    })
  }

  function toSendForm(event : FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("form enviado")
  }


  return (
    <Popover.Portal>
      <Popover.Content
        side={"right"}
        className="relative w-[28rem] 2xl:w-[32rem] bg-violet-500 rounded-2xl text-white p-5 pr-16 pb-12 z-[2] m-4">
        <Popover.Close className="absolute right-4 top-4">
          <X size={24} />
        </Popover.Close>
        <form action="" onSubmit={(event) => toSendForm(event)} className="flex flex-col items-center gap-3">
          <label
            htmlFor="title"
            className="opacity-0 w-0 h-0 absolute">Adiconar Título</label>
          <input
            id="title"
            type="text"
            required
            placeholder="Adicionar título"
            className="placeholder:text-white px-2 py-1 border border-solid  border-white/40 rounded-lg w-full outline-none focus:border-white "
          />

          <label htmlFor="date" className="opacity-0 w-0 h-0 absolute">Adicionar data</label>
          <span className="placeholder:text-white px-2 py-1 border border-solid border-white/40 rounded-lg w-full outline-none focus:border-white">
          {currentDay ? currentDay.format("dddd, DD [de] MMMM") : dayjs().format("dddd")}
          </span>
          {/* <input
            type="date"
            name=""
            id="date"
            value={currentDay ? currentDay : dayjs().format("YYYY-MM-DD")}
            className="placeholder:text-white px-2 py-1 border border-solid border-white/40 rounded-lg w-full outline-none focus:border-white"
          >

          </input> */}

          <div className="w-full flex items-center gap-3">
            <label
              htmlFor="hourStart"
              className="opacity-0 w-0 h-0 absolute">
              Horario de inicio da reunião
            </label>
            <input
              type="time"
              id="hourStart"
              className="border border-solid border-white/40 outline-none focus:border-white p-2 rounded-lg flex-1"
            />

            <span className="font-semibold">até</span>

            <label
              htmlFor="hourEnd"
              className="opacity-0 w-0 h-0 absolute">
              Horario de fim da reunião
            </label>
            <input
              type="time"
              id="hourEnd"
              className=" border border-solid border-white/40 focus:border-white outline-none p-2 rounded-lg flex-1"
            />
          </div>

          <Popover.Root>

            <Popover.Trigger className="w-full">
              <div className="p-2 text-sm text-white w-full flex gap-4 items-center rounded-lg border border-solid border-white/40 focus:border-white">
                <User size={20} />
                <div className="flex-1 flex gap-1 flex-wrap">
                  {localGuests.length !== 0 ? (
                    localGuests.map(guest =>
                      <span className="whitespace-nowrap p-1 w-min text-xs flex gap-1 items-center border border-solid border-white/40 rounded hover:bg-black/10">
                        {guest.name}
                        <X size={12} onClick={() => removeGuest(guest)} />
                      </span>
                    )) : (
                    <span className="text-sm font-semibold">
                      Adicionar convidados
                    </span>
                  )

                  }

                </div>
              </div>
            </Popover.Trigger>
            <Popover.Content align="start" alignOffset={45}>
              <div className="min-w-[16rem] bg-white shadow-2xl">
                {people.map(person => (
                  !localGuests.includes(person) && (
                    <div
                      className="p-2 flex gap-2 items-center hover:bg-gray-300/80 cursor-pointer"
                      onClick={() => addGuest(person)}
                    >
                      <Image
                        className="rounded-full"
                        width={32}
                        height={32}
                        src={person.perfilLink}
                        alt="Foto da pessoa"
                      />
                      <div>
                        <span className="block text-blue-900 text-sm">{person.name}</span>
                        <span className="block text-gray-500 text-xs">{person.office}</span>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </Popover.Content>
          </Popover.Root>





          {/* <Select.Root>
            <Select.Trigger
              className="rounded text-sm text-zinc-500 w-full flex py-3 px-4 justify-between items-center"
            >
              <Select.Value placeholder="Adicionar convidados"/>


            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="bg-white text-center rounded">
                <Select.Viewport className="text-violet-500 py-2 cursor-pointer">
                  {peoplesName.map((people, index) => (
                    <Select.Item
                      key={`${people}- ${index}`}
                      value={people}
                      className="py-2 px-2 hover:bg-violet-500 hover:text-white rounded-lg flex justify-between items-center">
                      <Select.ItemText >
                        {people}
                      </Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root> */}

          <textarea
            className="h-20 resize-none border border-solid border-white/40 bg-transparent rounded-lg outline-none px-4 py-2 w-full text-sm font-semibold placeholder:font-normal placeholder:text-white"
            placeholder="Adicionar uma descrição"
          />

          <label
            htmlFor="url"
            className="opacity-0 w-0 h-0 absolute">
            Link da reunião
          </label>
          <input
            type="url"
            id="url"
            placeholder="https://calendar.google.com"
            className="w-full border border-solid border-white/40 focus:border-white rounded-lg py-2 px-4 outline-none"
            pattern="https://.*" />

          <button 
            className="mt-2 max-w-max py-2 px-20 rounded-lg bg-white text-violet-500 font-semibold"
            type="submit"  
          >
            Salvar
          </button>
        </form>
      </Popover.Content>
    </Popover.Portal >
  )
}