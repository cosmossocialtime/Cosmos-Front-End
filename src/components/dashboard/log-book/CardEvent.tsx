import { CaretRight, Clock } from 'phosphor-react'

export function CardEvent() {
  return (
    <div className="flex cursor-pointer items-center rounded-lg border border-solid border-transparent bg-gray-200 px-8 py-5 text-gray-600 hover:border-violet-500">
      <div className="text-violet-400">
        <span className="block text-2xl font-semibold">12</span>
        <span className="text-xm block">QUA</span>
      </div>

      <h3 className="ml-8 flex-1 font-semibold">Encontro 1</h3>

      <div className="mr-16 flex items-center">
        <Clock size={24} />
        <span className="font-semibold">19h00 às 21h</span>
      </div>

      <CaretRight size={24} />
    </div>
  )
}
