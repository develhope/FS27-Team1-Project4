import { useState } from "react";
import { useFetch } from "../custom-hooks/useFetch";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [onSubscribe, dataSub, errorSub] = useFetch(
    "newsletter/subscriber/add",
    "POST"
  );
  const [onGetSubscribers, dataSubscribers, errorSubscribers] = useFetch(
    "newsletter/subscribers",
    "GET"
  );

  async function handleSubscribe() {
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email not valid");
      throw new Error("Email not valid");
    }

    const subscribers = await onGetSubscribers();
    if (errorSubscribers) {
      alert("Couldn't retrive the subscribers");
      throw new Error(subscribers);
    }

    const emailsSubscribers = subscribers.map((sub) => sub.email);
    if (emailsSubscribers.includes(email)) {
      alert(email + " is already in use");
      throw new Error(email + " is already in use");
    }

    const response = await onSubscribe({ email });
    if (errorSub) {
      alert("Couldn't add the subscriber " + email);
      throw new Error(response);
    }

    alert(`${email} subscribed`);
    setEmail("");
  }

  return (
    <div className="newsletter">
      <p className="newsletter-title">LET&#39;S REMAIN IN CONTACT</p>
      <p className="newsletter-text">
        Subscribe to our newsletter to stay updated
        <br />
        on the latest news and receive exclusive offers!
      </p>
      <input
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        className="newsletter-input"
        type="text"
        placeholder="Enter your email here!"
        value={email}
      />
      <button
        onClick={handleSubscribe}
        className="newsletter-button buy-now-button"
      >
        SIGN UP
      </button>
    </div>
  );
}

/* implementare la logica e la media query */
