import { ArrowRight } from 'phosphor-react'

export default function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}) {
  return (
    <div
      onClick={props.onClick}
      className="absolute top-1/2 bottom-1/2 right-16 z-40 flex h-10  w-10 cursor-pointer items-center justify-center rounded-full bg-blue-100 text-lg lg:visible lg:flex"
    >
      <ArrowRight />
    </div>
  )
}
