import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export function TermsPrivacy() {
  const navigate = useNavigate()

  return (
    <div className="relative w-full terms-of-service privacy">
      <div className="card">
        <h1>Privacy</h1>
        <div className="privacy-container">
          <p>
            <span>Effective Date:</span> 14/11/2022
          </p>

          <p>
            At Nebula Tech 1, we are committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, and share your personal
            information when you use our website and services.{" "}
          </p>

          <ol className="flex flex-col">
            <li>
              <h2>Information We Collect</h2>
              <p>We collect the following types of informations:</p>
              <ul className="flex flex-col">
                <li>
                  <span>Personal Information:</span> When you create an account,
                  sign up for our services, or subscribe to our newsletter, we
                  collect information such as your name, email address, phone
                  number, and other contact details.
                </li>
                <li>
                  <span>Usage Data:</span> We automatically collect data about
                  how you interact with our website, such as your IP address,
                  browser type, operating system, pages viewed, and the time
                  spent on our site.
                </li>
                <li>
                  <span>Coockies and Tracking:</span> We use cookies and similar
                  tracking technologies to enhance your experience and improve
                  our services. You can manage your cookie preferences through
                  your browser settings.
                </li>
              </ul>
            </li>

            <li>
              <h2>How we Use Your Information</h2>
              <p>We use your information for the following purposes:</p>
              <ul className="flex flex-col">
                <li>
                  To provide and improve our services, including personalization
                  of content and user experience.
                </li>
                <li>
                  To communicate with you about your account, updates, or
                  promotions.
                </li>
                <li>
                  To analyze usage patterns and improve the performance of our
                  website.
                </li>
                <li>
                  To comply with legal obligations or enforce our terms of
                  service.
                </li>
              </ul>
            </li>

            <li>
              <h2>Sharing Your Information</h2>
              <p>
                We do not sell or rent your personal information to third
                parties. However, we may share your information with:
              </p>
              <ul className="flex flex-col">
                <li>
                  <span>Service Providers:</span> Third-party vendors that help
                  us with hosting, analytics, customer support, and other
                  services. These providers only access your data to perform
                  specific tasks on our behalf.
                </li>
                <li>
                  <span>Legal Compliance:</span> If required by law, we may
                  disclose your information to government authorities or in
                  response to valid legal requests.
                </li>
                <li>
                  <span>Business Transfers:</span> In the event of a merger,
                  acquisition, or sale of assets, your data may be transferred
                  as part of the business transaction.
                </li>
              </ul>
            </li>

            <li>
              <h2>Information We Collect</h2>
              <p>We collect the following types of informations:</p>
              <ul className="flex flex-col">
                <li>
                  <span>Personal Information:</span> When you create an account,
                  sign up for our services, or subscribe to our newsletter, we
                  collect information such as your name, email address, phone
                  number, and other contact details.
                </li>
                <li>
                  <span>Usage Data:</span> We automatically collect data about
                  how you interact with our website, such as your IP address,
                  browser type, operating system, pages viewed, and the time
                  spent on our site.
                </li>
                <li>
                  <span>Coockies and Tracking:</span> We use cookies and similar
                  tracking technologies to enhance your experience and improve
                  our services. You can manage your cookie preferences through
                  your browser settings.
                </li>
              </ul>
            </li>

            <li>
              <h2>Your Rights</h2>
              <p>
                You have the following rights regarding your personal
                information:
              </p>
              <ul className="flex flex-col">
                <li>
                  <span>Access:</span> You can request access to the personal
                  information we hold about you.
                </li>
                <li>
                  <span>Correction:</span> You can request corrections if your
                  personal information is inaccurate or incomplete.
                </li>
                <li>
                  <span>Deletion:</span> You can request the deletion of your
                  personal information, subject to certain legal exceptions.
                </li>
                <li>
                  <span>Opt-Out:</span> You may opt out of receiving marketing
                  communications from us by following the unsubscribe
                  instructions in any promotional email or by contacting us
                  directly.
                </li>
              </ul>
            </li>

            <li>
              <h2>Security</h2>
              <p>
                We take reasonable measures to protect your personal information
                from unauthorized access, loss, or misuse. However, no system is
                completely secure, and we cannot guarantee the absolute security
                of your information.
              </p>
            </li>

            <li>
              <h2>Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to
                provide our services, comply with legal obligations, or resolve
                disputes. You can request the deletion of your account or data
                by contacting us.{" "}
              </p>
            </li>

            <li>
              <h2>Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of
                18, and we do not knowingly collect personal information from
                children. If we become aware of any such data, we will promptly
                delete it.
              </p>
            </li>

            <li>
              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page, and the updated policy will take
                effect upon posting. We encourage you to review this policy
                periodically.
              </p>
            </li>

            <li>
              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data
                practices, please contact us at:
              </p>
              <ul className="flex flex-col items-center contact-privacy">
                <li>
                  <span>Email:</span> privacy@nebulatech1.com
                </li>
                <li>
                  <span>Address:</span> Nebula Tech 1 s.p.a, Via Santa Maria
                  Delle Grazie 183, Nocera, Italy
                </li>
              </ul>
            </li>
          </ol>
        </div>
        <div className="button-container">
          <Button text="Back to Page" onClick={() => navigate(-1)} />
        </div>
      </div>
    </div>
  );
}
