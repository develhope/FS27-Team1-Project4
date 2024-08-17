import { useState } from "react"

export function usePostFetch(path) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function postData(object){
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:3000/api/${path}`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(object)
      })

      if (response.ok) {
        const jsonData = await response.json()
        setData(jsonData)

        setLoading(false)
      } else {
        const errorMessage = "Something wen wrong, could't get the data"
        setError("Something wen wrong, could't get the data")
        setLoading(false)
        throw new Error(errorMessage)
      }
    } catch (error) {
      setLoading(false)
      setError(error.message)
      throw new Error(error.message)
    }
  }

  async function onPost(object) {
   return await postData(object)
  }

  return {data, error, loading, onPost}
}
