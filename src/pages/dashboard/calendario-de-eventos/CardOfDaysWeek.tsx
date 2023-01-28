interface CardOfDaysWeekProps {
  day: string
}

export default function CardOfDaysWeek({ day }: CardOfDaysWeekProps) {
  return (
    <div
      role={"button"}
      className="p-3 bg-zinc-100 rounded-2xl w-full border-2 border-zinc-100 hover:border-violet-400 border-solid transition-all duration-200">
      <span>{day}</span>
    </div>
  )
}