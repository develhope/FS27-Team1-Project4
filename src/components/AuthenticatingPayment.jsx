import { useNavigate } from "react-router-dom";
import { Loader } from "./Loader";
import { useEffect } from "react";
import { useRender } from "./ChatProvider";

export function AuthenticatingPayment({ id, message }) {
  const navigate = useNavigate();
  const { onRender } = useRender();

  useEffect(() => {
    setTimeout(() => {
      onRender();
      alert(message);
      navigate(`/shipping/${id}`);
    }, 2000);
  }, []);

  return (
    <div className="fixed flex flex-col items-center justify-center auth-container">
      <div className="flex flex-col items-center auth-card">
        <div className="flex flex-col items-center auth-header">
          <h3>Payment Authentication in Progress...</h3>
          <p>
            "Please wait while we securely verify your payment. This may take a
            few moments. Do not refresh or close this page."
          </p>
        </div>
        <Loader />
      </div>
    </div>
  );
}
