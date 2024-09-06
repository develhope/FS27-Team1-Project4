/*React Component author Domenico*/

import { useEffect, useState } from "react";
import { useFetch } from "../custom-hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { TermsNewsletter } from "./TermsNewsletter";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [terms, setTerms] = useState(false);
  const [newsletterTerms, setNewsletterTerms] = useState(false);
  const navigate = useNavigate();
  const [onSubscribe, dataSub, errorSub] = useFetch(
    "newsletter/subscriber/add",
    "POST"
  );
  const [onGetSubscribers, dataSubscribers, errorSubscribers] = useFetch(
    "newsletter/subscribers",
    "GET"
  );

  async function handleSubscribe() {
    if (!terms) {
      alert(
        "We need your agreement to our Terms before subscribing to the newsletter"
      );
      return;
    }
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
    setTerms(false)
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
      <div className="flex w-full justify-end gap-8 subscribe-container">
        <div className="flex items-center gap-3 newsletter-checkbox-container">
          <label
            htmlFor="terms"
            className="flex flex-col newsletter-terms items-end justify-center"
          >
            <h6>I agree to receive newsletters and promotional emails</h6>
            <p>
              By subscribing, you agree to our{" "}
              <span onClick={() => navigate("/privacy-terms")}>
                Privacy Policy
              </span>
              ,{" "}
              <span onClick={() => navigate("terms-of-service")}>
                Terms of Service
              </span>{" "}
              and our{" "}
              <span onClick={(event) => {
                event.stopPropagation()
                event.preventDefault()
                setNewsletterTerms(true)}}>
                Newsletter Terms
              </span>
              . You can unsubscribe anytime by contacting us at
              <span> newsletter@nabulatech1.com</span>
            </p>
          </label>
          <input
            type="checkbox"
            className="newsletter-checkbox"
            onChange={() => setTerms(!terms)}
            checked={terms}
            name="terms"
            id="terms"
          />
        </div>
        <button
          onClick={handleSubscribe}
          className="newsletter-button buy-now-button"
        >
          SIGN UP
        </button>
      </div>
      {newsletterTerms && (
        <TermsNewsletter onClose={() => setNewsletterTerms(false)} />
      )}
    </div>
  );
}

/* implementare la logica e la media query */
