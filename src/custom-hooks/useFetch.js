import { useState } from "react"

export function useFetch(path, method) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function fetchData(object, altPath = path, altMethod = method){
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:3000/api/${altPath}`, {
        method: altMethod,
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(object)
      })

      if (response.ok) {
        const jsonData = await response.json()

        setData(jsonData)
        setLoading(false)

        return jsonData
      } else {
        const jsonError = response.json()
        setError(jsonError)
        setLoading(false)

        return null
      }
    } catch (error) {
      setLoading(false)
      setError(error.message)
      return null
    }
  }

  async function onFetch(object, altPath = path, altMethod) {
   return await fetchData(object, altPath, altMethod)
  }

  return [onFetch, data, error, loading]
}
