import "./chat.scss";
import { to_Decrypt, to_Encrypt } from "../aes.js";
import { process } from "../store/action/index";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

function Chat({ username, roomname, socket }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();

  const dispatchProcess = (encrypt, msg, cipher) => {
    dispatch(process(encrypt, msg, cipher));
  };

  useEffect(() => {
    socket.on("message", (data) => {
      //decypt
      const ans = to_Decrypt(data.text, data.username);
      dispatchProcess(false, ans, data.text);
      console.log(ans);
      let temp = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: ans,
      });
      setMessages([...temp]);
    });
  }, [socket]);

  const sendData = () => {
    if (text !== "") {
      //encrypt here
      const ans = to_Encrypt(text);
      socket.emit("chat", ans);
      setText("");
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  console.log(messages, "mess");

  return (
    <div className="chat">
      <div className="user-name">
        <h2>
          {username} <span style={{ fontSize: "0.7rem" }}>in {roomname}</span>
        </h2>
      </div>
      <div className="chat-message">
        {messages.map((i) => {
          if (i.username === username) {
            return (
              <div className="message">
                <p>{i.text}</p>
                <span>{i.username}</span>
              </div>
            );
          } else {
            return (
              <div className="message mess-right">
                <p>{i.text} </p>
                <span>{i.username}</span>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="send">
        <input
          placeholder="enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData();
            }
          }}
        ></input>
        <button onClick={sendData}>Send</button>
      </div>
    </div>
  );
}
export default Chat;
