import { useLogBook } from '../../../context/LogBookProvider'
import { Book } from './Book'
import { ListOfEventsDay } from './ListOfEventsDay'

export function LogBookPageSwitcher() {
  const { selectedEvent } = useLogBook()

  return selectedEvent ? <Book /> : <ListOfEventsDay />
}
