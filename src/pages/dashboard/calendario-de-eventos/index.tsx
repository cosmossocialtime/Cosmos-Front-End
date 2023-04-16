import * as Popover from "@radix-ui/react-popover"
import dayjs from "dayjs"

import { CaretLeft, CaretRight } from "phosphor-react"

import { useState } from "react"
import getDaysOfMonth from "../../../utils/getDaysOfMonth"
import SideBar from "../sideBar"
import CardOfDaysWeek from "./CardOfDaysWeek"
import PopoverForMarkMeeting from "./PopoverForMarkMeeting"

const daysOfWeek = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
]

export default function CalendarioEventosPage() {

    const [currentMonth, setCurrentMonth] = useState(dayjs())
    const [daysOfMonth, setDaysOfMonth] = useState<dayjs.Dayjs[]>(getDaysOfMonth(currentMonth))

    const firstDayWeekOfMonth = Number(daysOfMonth[0].format("d"))
    const daysOfPreviousMonth = Array.from({ length: firstDayWeekOfMonth })

    const daysOfNextMonth = Array.from({ length: 42 - daysOfMonth.length - daysOfPreviousMonth.length })

    function getNextMonth() {
        setCurrentMonth(currentMonth.add(1, "month"))
        setDaysOfMonth(getDaysOfMonth(currentMonth.add(1, "month")))
    }

    function getPreviuosMonth() {
        setCurrentMonth(currentMonth.subtract(1, "month"))
        setDaysOfMonth(getDaysOfMonth(currentMonth.subtract(1, "month")))
    }


    return (
        <div className="flex">
            <SideBar />
            <main className="flex flex-col flex-1 px-20 py-12 2xl:py-16 max-h-screen">
                <header className="flex justify-between items-center">
                    <div className="flex items-center gap-2">

                        <CaretLeft
                            role={"button"}
                            aria-label="Voltar ao mês anterior"
                            color="#9D37F2"
                            size={24}
                            className="cursor-pointer"
                            onClick={getPreviuosMonth}
                        />

                        <h1
                            aria-label="Mês atual"
                            className="font-bold text-blue-900 text-3xl w-60 text-center">
                            {currentMonth.format("MMMM YYYY")}
                        </h1>

                        <CaretRight
                            role={"button"}
                            aria-label="Pular para mês seguinte"
                            color="#9D37F2"
                            size={24}
                            className="cursor-pointer"
                            onClick={getNextMonth}
                        />

                    </div>
                    <Popover.Root>
                        <Popover.Trigger
                            className="py-2 px-10 bg-violet-500 rounded-lg text-white text-sm font-semibold leading-tight hover:bg-violet-600 transition-all duration-200">
                            Marcar encontro
                        </Popover.Trigger>
                        <PopoverForMarkMeeting />
                    </Popover.Root>
                </header>

                <div
                    className="flex flex-1 flex-col gap-4 mt-4 w-full">
                    <div className="grid gap-4 2xl:gap-6 grid-cols-7 text-center w-full">
                        {daysOfWeek.map((day) => {
                            return (
                                <h3
                                    key={day}
                                    className="text-xl text-gray-500 font-medium"
                                >
                                    {day}
                                </h3>
                            )
                        })}
                    </div>

                    <div className="grid grid-cols-7 gap-4 2xl:gap-6 flex-1">
                        {daysOfPreviousMonth.map((day, index) => (
                            <div
                                key={index}
                                className="p-3 bg-zinc-100 rounded-2xl w-full cursor-not-allowed opacity-60 relative">
                                <span className="absolute top-3 left-3">{`0${index + 1}`}</span>
                            </div>
                        ))}

                        {daysOfMonth.map(day => (
                            <CardOfDaysWeek
                                key={day.toString()}
                                day={day}
                            />
                        ))}
                        {daysOfNextMonth.map((day, index) => (
                            <div
                                key={index}
                                className="p-3 bg-zinc-100 rounded-2xl w-full cursor-not-allowed opacity-60 relative">
                                <span className="absolute top-3 left-3">{`${index + 1 < 10 ? "0" : ""}${index + 1}`}</span>
                            </div>
                        ))}

                    </div>
                </div>

                <input type="date" className="[-webkit-appearance:none] appearance-none rounded-none focus:outline-none focus:shadow-outline-none" />
            </main>
        </div>
    )
}