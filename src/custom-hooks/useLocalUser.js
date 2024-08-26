/* Custom Hook Author Andrea */

import { useState } from "react";

export function useLocalUser() {
  const [user, setUser ] = useState(JSON.parse(localStorage.getItem("user_nt1")))

  function refreshUser() {
    setUser(JSON.parse(localStorage.getItem("user_nt1")))
  }

  return {user, refreshUser}
}
