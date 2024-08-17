/* Component Author Andrea */

import { useNavigate, useParams } from "react-router-dom";
import { upperCaseString } from "../custom-hooks/uppercaseString";
import { useEffect, useRef, useState } from "react";
import buildYourPcIcon from "../assets/build_pc_icon.png";
import shipping from "../assets/space-travel_violet.png";
import others from "../assets/assistant_violet.png";
import buildYourPcBanner from "../assets/build_your_pc_banner.png";
import shippingBanner from "../assets/shipping_banner.png";
import othersBanner from "../assets/others_banner.png";
import { Button } from "./Button";
import { useFetch } from "../custom-hooks/useFetch";

export function ContactCreateTicket() {
  const { category } = useParams();
  const [shippingNumber, setShippingNumber] = useState("");
  const [comment, setComment] = useState("");
  const [ticketTitle, setTicketTitle] = useState("");
  const idNewTicketRef = useRef(null);

  const navigate = useNavigate();

  const [onCreateTicket, newTicketData, newTicketError] = useFetch(
    "ticket/create",
    "POST"
  );
  const [onAddFirstMessage, firstMessage, firstMessageError] = useFetch(
    `ticket/add/${idNewTicketRef.current}`,
    "POST"
  );
  const [onAddLastMessage, addedLastMessage, lastMessageError] = useFetch(
    "last/add",
    "POST"
  );

  const user = 2;

  useEffect(() => {
    console.log(comment);
    console.log(category)
  }, [comment]);

  async function createNewTicket(event) {
    event.preventDefault();

    try {

      let createdTicket = null

      if (category === "shipping") {
        createdTicket = await onCreateTicket({
          openedBy: user,
          category,
          ticketTitle: `${shippingNumber} - ${ticketTitle}`,
        });
      } else {
        console.log({ openedBy: user, category, ticketTitle })
        createdTicket = await onCreateTicket({ openedBy: user, category, ticketTitle });
        console.log(createdTicket)
      }

      if (newTicketError && !createdTicket) {
        console.log("Error creating new ticket", newTicketError);
        return;
      }

      console.log(createdTicket)

      idNewTicketRef.current = createdTicket.id;

      console.log(idNewTicketRef.current)

      if (comment !== "") {
        await onAddFirstMessage({
          authorId: user,
          content: comment,
          ticketId: idNewTicketRef.current,
        }, `ticket/add/${idNewTicketRef.current}`);

        if (firstMessageError && !firstMessage) {
          console.log("Error adding the first message", firstMessageError);
          return;
        }
      }

      console.log("payload:", {userId: user, ticketId: idNewTicketRef.current, lastMessage: 0})
      const response = await onAddLastMessage({
        userId: user,
        ticketId: idNewTicketRef.current,
      });

      console.log("res", response)


      if (lastMessageError && !addedLastMessage) {
        console.log("Error adding the message count", lastMessageError);
        return
      }

      navigate(`/tickets/${idNewTicketRef.current}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center relative create-ticket">
      <img
        src={
          category === "build-your-pc"
            ? buildYourPcBanner
            : category === "shipping"
            ? shippingBanner
            : othersBanner
        }
        alt="create ticket banner"
      />
      <div className="flex flex-col items-center create-ticket-header">
        <h1>Create Ticket</h1>
      </div>
      <form
        className="flex flex-col items-center create-ticket-form"
        onSubmit={createNewTicket}
      >
        <div className="flex justify-center items-center form-create-ticket-category">
          <img
            src={
              category === "build-your-pc"
                ? buildYourPcIcon
                : category === "shipping"
                ? shipping
                : others
            }
            alt="category icon"
          />
          <h2>{upperCaseString(category)}</h2>
        </div>
        <div className="flex flex-col items center w-full form-create-ticket-content">
          <div className="flex flex-col items-center form-create-ticket-info">
            <p>
              {category === "build-your-pc"
                ? "Are you a gamer or a digital artist looking for the best pc to follow your passions? Are you on a budget? Contact our operators and they'll make sure to accomodate your every needs and find the best pc build for you!"
                : category === "shipping"
                ? "Having issues with the shippment? Let our operators know about it and they'll gladly help you find a solution! Write in the box below the shipping number and add a comment to let them know the specifics of your issues."
                : "Having troubles? Let our operators know, they'll try to help you find a solution to your problem!"}
            </p>
            {category === "shipping" && (
              <div className="flex flex-col items-start shipping-input">
                <label for="shipping-number">Shipping Number:</label>
                <input
                  type="text"
                  id="shipping-number"
                  name="shipping-number"
                  value={shippingNumber}
                  onChange={(event) => setShippingNumber(event.target.value)}
                  placeholder="Shipping Number"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col create-ticket-comment">
            <label for="ticket-title">Ticket Title:</label>
            <input
              type="text"
              id="ticket-title"
              name="ticket-title"
              placeholder="Ticket Title"
              value={ticketTitle}
              onChange={(event) => {
                setTicketTitle(event.target.value);
              }}
            />
            <label for="comment">Comment:</label>
            <textarea
              name="comment"
              id="comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Add a comment to help our operators figure out your issue"
            ></textarea>
            <div className="flex justify-end create-ticket-button-placer">
              <Button text="Submit Ticket" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
