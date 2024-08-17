/* Component Author Andrea */

import builYourPcIcon from "../assets/build_pc_icon.png";
import shipping from "../assets/space-travel_violet.png";
import others from "../assets/assistant_violet.png";

import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetFetch } from "../custom-hooks/useGetFetch";
import { useFetch } from "../custom-hooks/useFetch";
import { usePostImage, imageDomain } from "../custom-hooks/usePostImage";

import { GiBigGear } from "react-icons/gi";
import { RiChatSettingsLine } from "react-icons/ri";
import { PiArrowClockwise, PiChatCenteredSlashLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";
import { HiChevronDoubleLeft } from "react-icons/hi";

export function ContactChat() {
  const { id } = useParams();
  const { data, error, loading, onRefresh } = useGetFetch(`ticket/${id}`);
  const [message, setMessage] = useState("");
  const [sendingError, setSendingError] = useState(null);
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState("");

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modifyMessage, setModifyMessage] = useState(false);
  const [modifyMessageError, setModifyMessageError] = useState(null);
  const [tempModifyMessage, setTempModifyMessage] = useState(null);

  const [showImage, setShowImage] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const inputModifyMessageRef = useRef(null);

  const [postMessage, messageData, messageError, messageLoading] = useFetch(
    `ticket/add/${id}`,
    "POST"
  );
  const [updateLastMessage, lastMessage, errorLastMessage] = useFetch(
    `last/${id}`,
    "PUT"
  );
  const [deleteImage, confirmDelete, errorDelete] = useFetch(
    "upload/delete",
    "DELETE"
  );
  const [onDeleteMessage, deleteMessageData, deleteMessageError] = useFetch(
    `ticket/delete/${selectedMessage}`,
    "PUT"
  );

  const [onUpdateMessage, updateMessageData, updateMessageError] = useFetch(
    `ticket/update/${selectedMessage}`,
    "PUT"
  );

  const [onUpdateImage, uploadError] = usePostImage(setImage);
  const [user, setUser] = useState(2);

  useEffect(() => {
    updateUserReadMessage();
  }, [user]);

  useEffect(() => {
    console.log(uploadImage);
  }, [uploadImage]);

  useEffect(() => {
    console.log(image);
  }, [image]);

  /* This effect renders the delete of the image before the post*/
  useEffect(() => {
    setImage(null);
  }, [confirmDelete]);

  useEffect(() => {
    console.log("selected: " + selectedMessage, "modify: " + modifyMessage);
  }, [selectedMessage, modifyMessage]);

  /* This effect stops the scroll when the image is open */
  useEffect(() => {
    if (showImage) {
      document.body.style.overflow = "hidden";
    }
    console.log(showImage);

    return () => (document.body.style.overflow = "");
  }, [showImage]);

  /* This function updates the last message seen by the user in this chat when the page is
  opened*/
  async function updateUserReadMessage() {
    try {
      await updateLastMessage({ userId: user });

      if (errorLastMessage) {
        return console.log(errorLastMessage);
      }

      await onRefresh();
      console.log("User's seen messages updated");
    } catch (error) {
      console.log(error);
    }
  }

  /* This event handler let the user post new messages*/
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await postMessage({ authorId: user, image, content: message });
      await onRefresh();
      setImage(null);
      setMessage("");
    } catch (error) {
      console.log(error);
      setSendingError("A problem occured, couldn't send the message");
    }
  }

  /* This event handler manages the upload of an image in a message */
  async function handleUploadImage(image) {
    try {
      if (uploadImage !== "") {
        await onUpdateImage(image);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* This event handler let the user delete the image before sending the message
  (the image will be deleted in the server, too) */
  async function handleDeleteImage() {
    try {
      await deleteImage({ image });

      if (errorDelete) {
        console.log(errorDelete);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* This event handler let the user delete a message in the chat (it will be a soft delete) */

  async function handleMessageDelete() {
    setModifyMessageError(null);
    try {
      await onDeleteMessage();

      if (deleteMessageError) {
        setModifyMessageError("Error: couldn't delete the message");
      } else {
        await onRefresh();
        console.log("message deleted");
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* This event handler let the user modify the message chat  */

  async function handleModifyChat(event) {
    event.preventDefault();
    event.stopPropagation();

    setModifyMessageError(null);
    try {
      await onUpdateMessage({ content: tempModifyMessage });

      if (updateMessageError) {
        setModifyMessageError("Error: couldn't update the message");
      } else {
        setTempModifyMessage(null);
        setModifyMessage(false);
        await onRefresh();
        console.log("message Modified");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={`flex flex-col items-center relative contact-chat`}
      onClick={() => {
        setSelectedMessage(null);
        setModifyMessage(false);
        setTempModifyMessage(null);
      }}
    >
      <div className="flex items-center tickets-page">
        <Link to="/tickets" className="flex items-center justify-center arrows">
          <HiChevronDoubleLeft />
        </Link>
      </div>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Something went wrong</h1>}
      {data && !error && (
        <div className="flex flex-col items-center contact-chat-container">
          <div className="flex items-center contact-chat-header">
            <div className="flex items-center justify-center icon-container">
              <img
                src={
                  data.category === "build-your-pc"
                    ? builYourPcIcon
                    : data.category === "shipping"
                    ? shipping
                    : others
                }
                alt="category icon"
              />
            </div>
            <h1>{data.ticketTitle}</h1>
          </div>
          <div
            className={`flex flex-col justify-end items-center relative contact-chat-content ${
              image ? "send-image-opened" : ""
            }`}
          >
            {data.chat.map((mes, index) =>
              user === mes.authorId ? (
                <div className="flex chat-line" key={mes.id}>
                  <div></div>
                  <div
                    className="flex flex-col justify-center items-end tools-and-baloon-container"
                    onClick={(event) => {
                      event.stopPropagation();
                      setModifyMessage(false);
                    }}
                  >
                    {modifyMessageError && (
                      <p className="modify-error">{modifyMessageError}</p>
                    )}
                    <div
                      className={`flex flex-col items-center justify-center tools ${
                        modifyMessage && selectedMessage === mes.id
                          ? "tools-opened"
                          : ""
                      }`}
                    >
                      <div
                        className="flex items-center chat-tool"
                        onClick={(event) => {
                          event.stopPropagation();
                          setTempModifyMessage(mes.content);
                          setTimeout(() => {
                            inputModifyMessageRef.current?.focus();
                          }, 200);
                        }}
                      >
                        <RiChatSettingsLine />
                        <p>modify</p>
                      </div>
                      <div className="line"></div>
                      <div
                        className="flex items-center chat-tool"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleMessageDelete();
                        }}
                      >
                        <PiChatCenteredSlashLight />
                        <p>delete</p>
                      </div>
                    </div>
                    <GiBigGear
                      className={`open-tools ${
                        modifyMessage && selectedMessage === mes.id
                          ? "selected"
                          : ""
                      }`}
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedMessage(mes.id);
                        setModifyMessage(!modifyMessage);
                      }}
                    />
                    <div
                      className={`chat-baloon user ${
                        index !== 0 &&
                        data.chat[index - 1].authorId === mes.authorId
                          ? ""
                          : "tick-user"
                      }`}
                    >
                      {mes.image && (
                        <img
                          src={imageDomain + mes.image}
                          alt="message image"
                          onClick={() => {
                            setCurrentImage(imageDomain + mes.image);
                            setShowImage(true);
                          }}
                        />
                      )}
                      {(!tempModifyMessage || selectedMessage !== mes.id) && (
                        <p>{mes.content}</p>
                      )}
                      {tempModifyMessage && selectedMessage === mes.id && (
                        <form
                          className="flex items-center justify-end chat-modifying-message"
                          onSubmit={handleModifyChat}
                        >
                          <textarea
                            id="modify-chat"
                            name="modify-chat"
                            onKeyDown={(event) => {
                              if (event.key === "Enter" && !event.shiftKey)
                                handleModifyChat(event);
                            }}
                            onClick={(event) => {
                              event.stopPropagation();
                              setModifyMessage(true);
                            }}
                            ref={inputModifyMessageRef}
                            type="text"
                            onChange={(event) =>
                              setTempModifyMessage(event.target.value)
                            }
                            value={tempModifyMessage}
                          />
                          <button
                            className="flex items-center justify-center"
                            onClick={(event) => {
                              event.stopPropagation();
                            }}
                          >
                            <FaChevronRight className="button-icon" />
                          </button>
                        </form>
                      )}
                      <div className="date">
                        <div></div>
                        <p>
                          Posted: {new Date(mes.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {mes.id && <div className="chat-line" key={mes.id}>
                    <div
                      className={`chat-baloon not-user ${
                        index !== 0 &&
                        data.chat[index - 1].authorId === mes.authorId
                          ? ""
                          : "tick-not-user"
                      }`}
                    >
                      {mes.image && (
                        <img
                          src={imageDomain + mes.image}
                          alt="message image"
                          onClick={() => setShowImage(true)}
                        />
                      )}

                      <p>{mes.content}</p>

                      <div className="date">
                        <p>
                          Posted: {new Date(mes.createdAt).toLocaleString()}
                        </p>
                        <div></div>
                      </div>
                    </div>
                    <div></div>
                  </div>}
                </>
              )
            )}
            {messageLoading && (
              <div className="chat-line">
                <div></div>
                <div className={`chat-baloon user tick-user `}>
                  <p>Loading...</p>
                </div>
              </div>
            )}
            {sendingError && (
              <div className="chat-line">
                <div></div>
                <div className="flex flex-col items-end error-message">
                  <p>{sendingError}</p>
                  <div className="flex items-center error-line">
                    <div
                      className="flex items-center justify-center relative retry"
                      onClick={handleSubmit}
                    >
                      <PiArrowClockwise />
                    </div>
                    <div className={`flex chat-baloon user tick-user`}>
                      <p>{message}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {image && (
              <div className="flex justify-end relative send-image">
                <img src={imageDomain + image} alt="sending image" />
                <div
                  className="flex justify-center items-center absolute delete"
                  onClick={handleDeleteImage}
                >
                  <RxCross2 />
                </div>
              </div>
            )}
          </div>
          <form
            className="flex flex-col items-center justify-between contact-chat-sending-form"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-between items-center chat-upload-image">
              <input
                type="file"
                id="image"
                name="image"
                className=""
                onChange={(event) => {
                  setUploadImage(event.target.files[0]);
                }}
              />
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleUploadImage(uploadImage);
                }}
                className="flex justify-center items-center w-full h-full"
              >
                <AiOutlinePlus className="button-icon" />
              </button>
            </div>
            <div className="flex items-end justify-end sending-message">
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey)
                    handleSubmit(event);
                }}
              />
              <button>
                <FaChevronRight className="button-icon" />
              </button>
            </div>
          </form>
        </div>
      )}
      <button onClick={() => setUser(user === 1 ? 2 : 1)}>Switch Users</button>
      <div
        className={`fixed hidden big-image ${showImage ? "image-open" : ""}`}
        onClick={() => {
          setShowImage(false);
          setCurrentImage(null);
        }}
      >
        {currentImage && <img src={currentImage} alt="Image" />}
      </div>
    </div>
  );
}
