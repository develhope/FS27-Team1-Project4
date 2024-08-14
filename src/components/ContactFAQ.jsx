/* Component author Andrea */

import { useState } from "react";
import faqImage from "../assets/faq.png";
import { useGetFetch } from "../custom-hooks/useGetFetch";
import { useResponsiveWidth } from "../custom-hooks/useResponsiveWidth";
import { FaChevronDown } from "react-icons/fa6";

export function ContactFAQ() {
  const [openedQuestion, setOpenedQuestion] = useState(null);
  const [faqToggle, setFaqToggle] = useState(false)
  const { screenWidth } = useResponsiveWidth();
  const { data, error, loading } = useGetFetch("faqs");

  function handleFaqToggle(id) {
    if (openedQuestion === id) {
      setFaqToggle(!faqToggle)
    } else (
      setFaqToggle(true)
    )
  }

  return (
    <div className="flex flex-col items-center relative faq">
      <div className="flex flex-col items-center relative faq-header">
        <img src={faqImage} alt="FAQ image" />
        <div className="flex justify-center faq-title">
          <h1>FAQ</h1>
        </div>
      </div>
      <div className="flex flex-col items-center faq-content">
        {data &&
          data.map((faq) => (
            <div
              key={faq.id}
              onClick={() => {
                setOpenedQuestion(faq.id);
                handleFaqToggle(faq.id)
              }}
              className={`flex flex-col items-center single-faq ${screenWidth >= 768
                ? "single-faq-opened"
                : openedQuestion === faq.id && faqToggle
                ? "single-faq-opened"
                : ""}`}
            >
              <div className="flex items-center single-faq-header relative">
                <div className="question">Q</div>
                <div
                  className={`flex items-center justify-start relative single-faq-title ${
                    screenWidth >= 768
                      ? "single-faq-title-opened"
                      : openedQuestion === faq.id && faqToggle
                      ? "single-faq-title-opened"
                      : ""
                  }`}
                >
                  <h4>{`: ${faq.question}`}</h4>
                </div>
                <FaChevronDown className={`absolute right-7 ${screenWidth >= 768
                ? "hidden"
                : openedQuestion === faq.id && faqToggle
                ? "reverse"
                : ""}`}/>
              </div>
              <div
                className={`${
                  screenWidth >= 768
                    ? "flex"
                    : openedQuestion === faq.id && faqToggle
                    ? "flex"
                    : "hidden"
                } relative faq-awnser-container`}
              >
                <div className="awnser">A</div>
                <p>{`:${faq.awnser}`}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
