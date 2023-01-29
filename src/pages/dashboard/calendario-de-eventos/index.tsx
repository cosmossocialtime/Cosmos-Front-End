import dayjs from "dayjs"
import { CaretLeft, CaretRight } from "phosphor-react"

import { useState } from "react"
import { getDaysOfMonth } from "../../../utils/getDaysOfMonth"
import { SideBar } from "../sideBar"
import CardOfDaysWeek from "./CardOfDaysWeek"

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

    const currentMonth = dayjs()
    const [daysOfMonth, setDaysOfMonth] = useState<dayjs.Dayjs[]>(getDaysOfMonth(currentMonth))

    console.log(daysOfMonth);

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
                            className="cursor-pointer" />

                        <h1
                            aria-label="Mês atual"
                            className="font-bold text-blue-900 text-3xl">
                            {currentMonth.format("MMMM YYYY")}
                        </h1>

                        <CaretRight
                            role={"button"}
                            aria-label="Pular para mês seguinte"
                            color="#9D37F2"
                            size={24}
                            className="cursor-pointer" />

                    </div>
                    <button
                        className="py-2 px-10 bg-violet-500 rounded-lg text-white text-sm font-semibold leading-tight hover:bg-violet-600 transition-all duration-200">
                        Marcar encontro
                    </button>
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
                        {daysOfMonth.map(day => (
                            <CardOfDaysWeek key={day.toString()} day={day.format("DD")} />
                        ))}

                    </div>
                </div>
            </main>
        </div>
    )
}