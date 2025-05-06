import { PlanetItem, PlanetItemProps } from './planetItem'

interface PlanetGridProps {
  items: (PlanetItemProps | null)[]
  columns?: number
  rows?: number
}

export function PlanetGrid({ items, columns = 3, rows = 3 }: PlanetGridProps) {
  return (
    <div
      className="grid h-full w-[600px]"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {items.map((item, index) =>
        item ? <PlanetItem key={index} {...item} /> : <div key={index} />
      )}
    </div>
  )
}
