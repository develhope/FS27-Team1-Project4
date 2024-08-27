/* Custom Hook Author Andrea */

import { useNavigate } from "react-router-dom";
import { useFetch } from "./useFetch";
import { useLocalUser } from "./useLocalUser";
import { useRender } from "../components/ChatProvider";

export function useGameCompleted(id){
  const {refreshUser} = useLocalUser()
  const [onComplete, completeData, completeError] = useFetch(`game/completed/${Number(id)}`, "PUT")
  const navigate = useNavigate()
  const {onRender} = useRender()

  async function handleComplete() {
    try {
    const response = await onComplete()

    if (completeError) {
      throw new Error(completeError)
    }

    alert(response.msg)
    localStorage.setItem("user_nt1", JSON.stringify(response.user))
    onRender()
    navigate("/deep")

    } catch(error) {
      throw new Error(error)
    }
  }

  async function onCompleted() {
    await handleComplete()
  }

  return onCompleted
}
