export function Newsletter() {
  return (
    <div className="newsletter">
      <p className="newsletter-title">LET&#39;S REMAIN IN CONTACT</p>
      <p className="newsletter-text">
        Subscribe to our newsletter to stay updated
        <br />
        on the latest news and receive exclusive offers!
      </p>
      <input
        className="newsletter-input"
        type="text"
        placeholder="Enter your email here!"
      />
      <button className="newsletter-button buy-now-button">SIGN UP</button>
    </div>
  );
}

/* implementare la logica e la media query */
