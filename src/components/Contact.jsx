import { useEffect, useState } from "react";

export function Contact() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      if (response.ok) {
        const json = await response.json();

        setData(json);
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);

  return (
    <div className="flex flex-col items-center contact">
      <div className="flex flex-col items-center sub">
        {!data && !error && <h1> Loading...</h1>}
        {!data && error && <h1>{error}</h1>}
        {data && !error && (
          <>
            <img src={data[0].avatarUrl} alt={data[0].username}></img>
            <h1>{data[0].username}</h1>
          </>
        )}
      </div>
    </div>
  );
}
