import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export function Logout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch( "http://localhost:3000/api/users/logout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("authToken");
        navigate("/login");
        alert("Logout succesfully")
      } else {
        console.error("Logout fallito");
      }
    } catch (error) {
      console.error("Errore durante il logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}
