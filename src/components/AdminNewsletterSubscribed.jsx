/*React Component author Domenico*/

import { useGetFetch } from "../custom-hooks/useGetFetch";
import { LoadingMessage } from "./LoadingMessage";
import { ErrorMessage } from "./ErrorMessage";
import { useEffect } from "react";

export function AdminNewsletterSubscribed() {
  const { data, error, loading } = useGetFetch("newsletter/subscribers");

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center admin-users-list">
      <h1>Newsletter Subscribed</h1>

      {loading && <LoadingMessage />}
      {error && <ErrorMessage />}
      {data && (
        <div className="flex justify-center items-center users-container">
          <div className="flex flex-col items-center users-list">
            {data.map((user, index) => (
              <div key={user.id} className="flex flex-col w-full single-user">
                <div className="flex items-center user-info">
                  <div className="flex items-center justify-center username-container">
                    <h4>{user.email}</h4>
                  </div>
                </div>
                {index < data.length - 1 && (
                  <div className="separation-line"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
