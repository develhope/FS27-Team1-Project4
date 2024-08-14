/* Custom Hook author Andrea */

import { useEffect, useState } from "react";

export function useGetFetch(path) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function getData(){
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:3000/api/${path}`)

      if (response.ok) {
        const jsonData = await response.json()
        setData(jsonData)

        setLoading(false)
      } else {
        setError("Something wen wrong, could't get the data")
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => {
    getData()
  }, [path])
  
  function onRefresh() {
    getData()
  }

  return {data, error, loading, onRefresh}
}
