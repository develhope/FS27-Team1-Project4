import builYourPcIcon from "../assets/build_pc_icon.png";
import { AiOutlinePlus } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";
import { useState } from "react";

export function ContactChat() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("Bredina");
  const [chatConversation, setChatConversation] = useState([
    {
      id: 1,
      author: "Bredina",
      content: "Hi Breda! How can I assist you with your new PC build today?",
    },
    {
      id: 2,
      author: "Breda",
      content:
        "Hi Bredina! I'm looking to build a PC for digital painting. I need some recommendations for components.",
    },
    {
      id: 3,
      author: "Breda",
      content:
        "Also, could you help me understand the difference between a good GPU and a great one for my needs?",
    },
    {
      id: 4,
      author: "Bredina",
      content:
        "Sure! For digital painting, you'll want a GPU with high color accuracy and sufficient VRAM. A good GPU will handle most tasks well, but a great one will provide faster performance and better support for high-resolution displays and complex software.",
    },
    {
      id: 5,
      author: "Breda",
      content:
        "Got it. What about the processor and RAM? Any specific recommendations there?",
    },
    {
      id: 6,
      author: "Bredina",
      content:
        "For the processor, a high-performance CPU with multiple cores will be beneficial. Look for something from the AMD Ryzen 7 or Intel i7 series. As for RAM, 16GB should be the minimum, but 32GB is ideal if you work with large files or multiple applications simultaneously.",
    },
    {
      id: 7,
      author: "Breda",
      content:
        "Great, thanks! I also need a monitor. Any advice on what to look for?",
    },
    {
      id: 8,
      author: "Bredina",
      content:
        "For a monitor, look for one with high resolution (at least 1440p, but 4K is better) and good color accuracy. An IPS panel is usually a good choice for accurate colors and wide viewing angles.",
    },
    {
      id: 9,
      author: "Breda",
      content:
        "Thanks for all the help! I’ll look into these recommendations and get back to you if I have more questions.",
    },
    {
      id: 10,
      author: "Bredina",
      content:
        "You're welcome! Feel free to reach out anytime. Happy building!",
    },
  ]);

  function handleSubmit(event) {
    event.preventDefault();
    setChatConversation([
      ...chatConversation,
      { id: chatConversation.length + 1, author: user, content: message },
    ])
    setMessage("");
  }

  return (
    <div className="flex flex-col items-center relative contact-chat">
      <div className="flex flex-col items-center contact-chat-container">
        <div className="flex items-center contact-chat-header">
          <div className="flex items-center justify-center icon-container">
            <img src={builYourPcIcon} alt="category icon" />
          </div>
          <h1>TICKET TITLE</h1>
        </div>
        <div className="flex flex-col justify-end items-center relative contact-chat-content">
          {chatConversation.map((mes, index) =>
            user === mes.author ? (
              <div className="chat-line" key={mes.id}>
                <div></div>
                <div
                  className={`chat-baloon user ${
                    index !== 0 &&
                    chatConversation[index - 1].author === mes.author
                      ? ""
                      : "tick-user"
                  }`}
                >
                  <p>{mes.content}</p>
                </div>
              </div>
            ) : (
              <div className="chat-line" key={mes.id}>
                <div
                  className={`chat-baloon not-user ${
                    index !== 0 &&
                    chatConversation[index - 1].author === mes.author
                      ? ""
                      : "tick-not-user"
                  }`}
                >
                  <p>{mes.content}</p>
                </div>
                <div></div>
              </div>
            )
          )}
        </div>
        <form
          className="flex items-end justify-between contact-chat-sending-form"
          onSubmit={handleSubmit}
        >
          <button className="chat-upload-image">
            <AiOutlinePlus className="button-icon" />
          </button>
          <div className="flex items-end justify-end sending-message">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey)
                  handleSubmit(event)
              }}
            />
            <button>
              <FaChevronRight className="button-icon" />
            </button>
          </div>
        </form>
      </div>
      <button
        onClick={() => setUser(user === "Bredina" ? "Breda" : "Bredina")}
      >
        Switch Users
      </button>
    </div>
  );
}
