import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate da React Router
import '../style/TermsOfService.scss'; // Importa il file SCSS dalla cartella "style"
import { Button } from './Button';

const TermsOfService = () => {
    const navigate = useNavigate(); // Crea una funzione di navigazione

    const handleBackClick = () => {
        navigate(-1); // Torna alla pagina precedente
    };

    return (
        <div className="terms-of-service">
            <div className="card">
                <h1>Terms of Service</h1>
                <p>Last updated: August 27, 2024</p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing and using our service, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>

                <h2>2. Description of Service</h2>
                <p>
                    We are providing users with [describe the service you are offering]. You must provide your own access to the internet, and pay any fees associated with such access. You must provide all equipment necessary to make such a connection to the internet, including a computer and modem or other access device.
                </p>

                <h2>3. User Conduct</h2>
                <p>
                    You agree to use the Service only for lawful purposes. You agree not to take any action that might compromise the security of the Service, render the Service inaccessible to others, or otherwise cause damage to the Service or the content. You agree not to use the Service in any manner that might interfere with the rights of third parties.
                </p>

                <h2>4. Modifications to the Service and Prices</h2>
                <p>
                    Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                </p>

                <h2>5. Limitation of Liability</h2>
                <p>
                    In no event shall [Your Company Name], nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
                </p>

                <h2>6. Changes to the Terms of Service</h2>
                <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>

                <p>If you have any questions about these Terms, please contact us at [your contact information].</p>

                <div className="button-container">
                    <Button text="Back to Page" onClick={handleBackClick} />
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
