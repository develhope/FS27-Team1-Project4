import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

export function TermsNewsletter({onClose}) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = "");
  }, []);

  return (
    <div className="relative terms-container" onClick={onClose}>
      <div className="terms" onClick={(event) => event.stopPropagation()}>
        <h2>Newsletter Subscription Terms</h2>

        <div className="terms-info">
          <p>
            By subscribing to our newsletter, you agree to the following terms:
          </p>
          <ol>
            <li>
              <span>Subscription:</span> You consent to receive periodic emails
              containing news, updates, promotions, or information about our
              services.
            </li>
            <li>
              <span>Privacy:</span> Your email address and personal data will be
              handled according to our{" "}
              <span className="terms-link" onClick={() => navigate("/privacy-terms")}>Privacy Policy</span>. We respect
              your privacy and will not share your information with third
              parties for marketing purposes without your consent.
            </li>
            <li>
              <span>Unsubscribing:</span> You can cancel your newsletter
              subscription at any time by clicking the "Unsubscribe" link in any
              newsletter email or by sending an email request to{" "}
              <span className="terms-link">newsletter@nebulatech1.com</span>{" "}
            </li>
          </ol>
          <p>By subscribing, you agree to these terms and conditions.</p>
        </div>
        <button onClick={onClose}>
          <RxCross1 />
        </button>
      </div>
    </div>
  );
}
