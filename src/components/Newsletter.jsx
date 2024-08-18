export function Newsletter() {
  return (
    <div className="newsletter">
      <p className="newsletter-title">RESTIAMO IN CONTATTO</p>
      <p className="newsletter-text">
        Iscriviti alla nostra newsletter per rimanere sempre aggiornato
        <br />
        sulle ultime novità e ricevere offerte esclusive!
      </p>
      <input
        className="newsletter-input"
        type="text"
        placeholder="Inserisci la tua mail qui!"
      />
      <button className="newsletter-button buy-now-button">SIGN UP</button>
    </div>
  );
}

/* implementare la logica e la media query */
