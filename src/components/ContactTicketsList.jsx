import { useEffect, useState } from "react";
import { useGetFetch } from "../custom-hooks/useGetFetch";
import buildYourPCIcon from "../assets/build_pc_icon.png";
import shipping from "../assets/space-travel_violet.png";
import others from "../assets/assistant_violet.png";
import { HiMiniChevronDoubleUp } from "react-icons/hi2";

export function ContactsTicketList() {
  const [userId, setUserId] = useState(2);
  const [tickets, setTickets] = useState(null);
  const [read, setRead] = useState(null);
  const [user, setUser] = useState(null);
  const ticketsData = useGetFetch("tickets");
  const userData = useGetFetch(`user/id/${userId}`);
  const readData = useGetFetch(`last/user/${userId}`);

  useEffect(() => {
    setTickets(ticketsData.data);
    setUser(userData.data);
    setRead(readData.data);
  }, [ticketsData, userData, readData]);

  function checkMessageRead(readMessage, ticket) {
    const relativeReadMessage = readMessage.find(
      (read) => read.ticketId === ticket.id
    );

    if (relativeReadMessage.lastMessage === ticket.numberOfMessages) {
      return false;
    } else {
      return ticket.numberOfMessages - relativeReadMessage.lastMessage;
    }
  }

  console.log(tickets);
  console.log(user);
  console.log(read);

  return (
    <div className="flex flex-col items-center relative ticket-list">
      <div className="flex flex-col items-center relative ticket-list-frame">
        <div className="flex flex-col items-center relative ticket-list-container">
          {(ticketsData.loading || userData.loading) && <h1>Loading...</h1>}
          {(ticketsData.error || userData.error) && (
            <h1>
              {ticketsData.error
                ? "Couldn't retrieve the list"
                : "Couldn't retrive the user"}
            </h1>
          )}
          {tickets &&
            user &&
            tickets.map((ticket) => (
              <div key={ticket.id} className="grid single-ticket">
                <div className="flex justify-center items-center img-grid-container">
                  <img
                    src={
                      ticket.category === "build-your-pc"
                        ? buildYourPCIcon
                        : ticket.category === "shipping"
                        ? shipping
                        : others
                    }
                    alt="ticket icon cathegory"
                  />
                </div>
                <h3>{ticket.ticketTitle}</h3>
                <div className="flex items-center justify-center date">
                  <p>
                    <span>opened:</span>{" "}
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center justify-center status">
                  <p>{ticket.closedAt ? "closed" : "open"}</p>
                </div>
                <div className="flex items-center justify-center notice">
                  {checkMessageRead(read, ticket) && <div className="flex justify-center items-center notification">
                    <HiMiniChevronDoubleUp className="chevron"/>
                    <p>{checkMessageRead(read, ticket)}</p></div>}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
