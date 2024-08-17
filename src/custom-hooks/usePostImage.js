import { useState } from "react"


export function usePostImage(setter) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function fetchData(image){
    setLoading(true)
    setError(null)

    try {
      /*Through the formData I transform in an object all the data from the file,
        in this case an image, that I want to upload and use it as the req.body */
        const formData = new FormData()
        formData.append("image", image)

      const response = await fetch(`http://localhost:3000/api/upload`, {
        method: "POST",
        body: formData
      })

      if (response.ok) {
        const jsonData = await response.json()
        setter(jsonData.path)

        setLoading(false)
      } else {
        setError("Something went wrong, couldn't upload the image")
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  async function onUploadImage(image) {
    await fetchData(image)
  }

  return [onUploadImage, error, loading]
}

export const imageDomain = "http://localhost:3000/"


