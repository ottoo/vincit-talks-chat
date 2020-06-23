import React, { useCallback, useEffect, useState } from "react";
import { usePubNub } from "pubnub-react";

import { formatTimetoken } from "../../utils/time";

import "./Chat.css";

const channelName = process.env.REACT_APP_PUBNUB_CHANNEL_NAME;
const formatMessageEvent = (event) => ({
  message: event.message?.text || event.entry.text,
  publisher: event.message?.sender || event.entry.sender,
  createdAt: formatTimetoken(event.timetoken),
});
const scrollToBottom = () => window.scrollTo(0, document.body.scrollHeight);

export const Chat = ({ uuid }) => {
  // Accessing the PubNub instance via React Context, defined in App.js.
  const pubnub = usePubNub();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  /**
   * Fetching the message history to display from PubNub, fetches max. 100 messages a time, if you
   * need to fetch more, would have to implement paging somehow.
   **/
  useEffect(() => {
    pubnub.history(
      {
        channel: channelName,
      },
      (_, response) => {
        setMessages(response.messages.map(formatMessageEvent));
        scrollToBottom();
      }
    );
  }, [pubnub]);

  /**
   * Adding a listener for receiving new messages from the PubNub channels that I subscribe to.Below,
   * subscribing to a single channel that I will then receive messages from.
   */
  useEffect(() => {
    const listeners = {
      message: (event) => {
        setMessages([...messages, formatMessageEvent(event)]);
      },
    };
    pubnub.addListener(listeners);
    pubnub.subscribe({ channels: [channelName] });

    scrollToBottom();

    return () => {
      pubnub.removeListener(listeners);
      pubnub.unsubscribeAll();
    };
  }, [pubnub, messages]);

  /**
   * Sending a message to the PubNub channel is done via the "publish" method, it takes an array of
   * channels and the message you want to send, returns a Promise.
   */
  const sendMessage = useCallback(
    async (message) => {
      await pubnub.publish({
        channel: [channelName],
        message: {
          sender: uuid,
          text: message,
        },
      });

      setInput("");
    },
    [pubnub, setInput, uuid]
  );

  return (
    <div className="chat">
      <header>
        <img src="/images/vincit-duck-1.png" alt="Vincit Logo" />
        <h1 className="mb-0">Vincit talks chat</h1>
      </header>
      <div className="message-container">
        <ul className="list-group messages">
          {messages.map((m, index) => {
            return (
              <li
                key={`message-${index}`}
                className="list-group-item message-row"
              >
                <div className="created-at">{m.createdAt}</div>
                <div className="sender">{m.publisher}: </div>
                <div className="message">{m.message}</div>
              </li>
            );
          })}
        </ul>
      </div>

      <form
        style={{
          display: "flex",
        }}
      >
        <input
          type="text"
          className="form-control new-message"
          placeholder="Type your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="btn mr-2 mb-2 btn-tertiary submit-btn"
          onClick={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};
