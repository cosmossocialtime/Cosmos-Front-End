import axios from 'axios'
import { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'

const { 'cosmos.token': Token } = parseCookies()
const Authorization = `Bearer ${Token}`
export default function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    axios
      .get(url, {
        headers: { Authorization },
      })
      .then((response) => {
        setData(response.data)
      })
  }, [url])

  return { data }
}
