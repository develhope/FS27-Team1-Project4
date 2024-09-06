import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

export function TermsSignUp({ onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = "");
  }, []);

  return (
    <div className="relative terms-container" onClick={onClose}>
      <div className="terms" onClick={(event) => event.stopPropagation()}>
        <h2>User Account Registration Terms</h2>

        <div className="terms-info">
          <p>
            By signing up for an account on Nebula Tech 1, you agree to the
            following terms and conditions:
          </p>
          <ol>
            <li>
              <span>Account Creation:</span> You must provide accurate and
              complete information during the sign-up process. You are
              responsible for maintaining the confidentiality of your password
              and account.
            </li>
            <li>
              <span>Eligibility:</span> You must be at least 18 years old, or
              the legal age of majority in your jurisdiction, to create an
              account.
            </li>
            <li>
              <span>Usage:</span> You agree to use the platform in accordance
              with our{" "}
              <span
                className="terms-link"
                onClick={() => navigate("/terms-of-service")}
              >
                Terms of Service
              </span>{" "}
              and{" "}
              <span
                className="terms-link"
                onClick={() => navigate("/privacy-terms")}
              >
                Privacy Policy
              </span>
              . Any fraudulent, abusive, or illegal activities may result in
              account termination.
            </li>
            <li>
              <span>Privacy:</span> Your personal information will be handled
              according to our{" "}
              <span
                className="terms-link"
                onClick={() => navigate("/privacy-terms")}
              >
                Privacy Policy
              </span>
              . We collect information to improve your experience and for
              security purposes. We will not share your data with third parties
              without your consent, except as required by law.
            </li>
            <li>
              <span>Account Deactivation:</span> You may request to deactivate
              your account at any time by visiting your account settings or
              contacting our support team at{" "}
              <span className="terms-link">support@nebulatech1.com</span> or
              creating a ticket on the{" "}
              <span className="terms-link" onClick={() => navigate("/contact")}>
                Contact us
              </span>{" "}
              section.
            </li>
          </ol>
          <p>
            By clicking the checkbox you acknowledge that you have read,
            understood, and agree to these terms.
          </p>
        </div>
        <button onClick={onClose}>
          <RxCross1 />
        </button>
      </div>
    </div>
  );
}
