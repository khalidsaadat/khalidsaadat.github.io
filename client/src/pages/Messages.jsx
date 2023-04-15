//Messages
//Author: Daria Koroleva
//Created: March 5,2023
//Description: Page to display messages
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import Chat from '../components/messages/Chat';
import ChatFeed from '../components/messages/ChatFeed';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ReportMenu from '../components/messages/ReportMenu';
import { encryptFileWithPassword } from "../components/messages/Encryption.js";
import DecryptFile from '../components/messages/DecryptFile';


function Messages() {


  const navigate = useNavigate();

  // checks if user is logged in, if not, redirects to login page
  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "1") {
      navigate("/login");
    }
  }, []);

  //start dm
  const { userIdStartDM, userNameStartDM } = useParams();

  const currentUser = localStorage.getItem("uid");
  const userName = localStorage.getItem("uname");
  const [conversations, setConversations] = useState([]);
  const [userSelected, setUserSelected] = useState('');
  const [showChatFeed, setShowChatFeed] = useState(true);
  const [respondents, setRespondents] = useState([]);


  const [isReportMenuVisible, setIsReportMenuVisible] = useState(false);
  const [reportedMessageId, setReportedMessageId] = useState(null);

  const [isDecryptFileVisible, setIsDecryptFileVisible] = useState(false);

  const [encryptedFileName, setEncryptedFileName] = useState('');
  const [encryptedFileUrl, setEncryptedFileUrl] = useState('');
  const [currentMessages, setCurrentMessages] = useState('');
  


  useEffect(() => {
    axios
      .get("/api/messages/receiver", {
        params: { receiver: currentUser },
      })
      .then((res) => {
        const result = Object.entries(res.data).map(([user, { name }]) => ({ user, name }));
        setRespondents(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentMessages]);

  useEffect(() => {

    let promises = respondents.map((respondent) => {
      return getMessages(currentUser, respondent);
    });

    Promise.all(promises).then((conversations) => {
      //Sort by time of the latest message 
      conversations.sort((a, b) =>
        b.messages[b.messages.length - 1].datetime.localeCompare(a.messages[a.messages.length - 1].datetime))


      if (conversations.some(conversation => conversation.user === userIdStartDM)) {
        setUserSelected(userIdStartDM);
      }
      else if (userIdStartDM) {
        conversations = [getNewConversation(userIdStartDM, userNameStartDM), ...conversations];
        setUserSelected(userIdStartDM);
      }
      else if (respondents.length > 0) {
        setUserSelected(conversations[0].user);
      }

      setConversations(conversations);

    });

  }, [respondents]);


  useEffect(() => {
    const pollInterval = 2000;

    const pollForNewMessages = () => {      
      checkForNewMessages();      
    };

    const intervalId = setInterval(pollForNewMessages, pollInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function checkForNewMessages() {
    axios
      .get("/api/messages/receiver", {
        params: { receiver: currentUser },
      })
      .then((res) => {
        
        const newMessages = JSON.stringify(res.data);
        
        setCurrentMessages((prevMessages) => {          
          if (prevMessages  !== newMessages) {              
            return newMessages;
          }
          return prevMessages;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }



  function getMessages(currentUser, respondent) {

    const sender = currentUser;
    const receiver = respondent.user;

    return axios.get('/api/messages/getmessage', {
      params: { sender, receiver },
    })
      .then((res) => {
        // handle the response data        
        return mapMessagesToUI(res.data, respondent);
      })
      .catch((err) => {
        // handle any errors
        console.log(err);
        return {};
      });
  }


  const deleteMessage = async (sender, receiver) => {
    await axios
      .delete("/api/messages/deletemessages", {
        params: { sender, receiver }
      })
      .then(() => {

        const newConversations = conversations.filter((conversation) => conversation.user !== receiver);
        setConversations(newConversations);

        if (userSelected == receiver && newConversations.length > 0) {
          setUserSelected(newConversations[0].user);
        }

      })
      .catch((err) => console.log("Error", err));
  };

  const postMessage = async (sender, receiver, message, time) => {
    await axios
      .post("/api/messages/postmessage", { sender, receiver, message, time })
      .then((res) => {

        let newMessage = {
          id: res.data._id,          
          time: formatTime(res.data.time),
          datetime: res.data.time,
          user: res.data.sender,
          name: userName,
          message: res.data.message,
          position: "end",
          attachments: res.data.attachments
        };

        const conversation = conversations.find((c) => c.user === receiver);
        conversation.messages = [...conversation.messages, newMessage];
        const newConversations = [conversation, ...conversations.filter((c) => c.user !== receiver)];
        setConversations(newConversations);
      })
      .catch((err) => console.log("Error", err));
  };

  const postMessageWithAttachement = async (sender, receiver, message, time, file, password) => {

    const formData = new FormData();
    const { encryptedFile } = await encryptFileWithPassword(file, password);

    formData.append("sender", sender);
    formData.append("receiver", receiver);
    formData.append("message", message);
    formData.append("time", time);
    formData.append("file", encryptedFile, file.name);

    await axios
      .post("/api/messages/postmessage", formData)
      .then((res) => {

        let newMessage = {
          id: res.data._id,
          time: formatTime(res.data.time),
          datetime: res.data.time,
          user: res.data.sender,
          name: userName,
          message: res.data.message,
          position: "end",
          attachments: res.data.attachments
        };

        const conversation = conversations.find((c) => c.user === receiver);
        conversation.messages = [...conversation.messages, newMessage];
        const newConversations = [conversation, ...conversations.filter((c) => c.user !== receiver)];
        setConversations(newConversations);
      })
      .catch((err) => console.log("Error", err));
  };




  const deleteMessageById = async (messageId) => {
    await axios
      .delete(`/api/messages/deletemessage/${messageId}`)
      .then(() => {
        const updatedConversations = conversations.map((conversation) => {
          if (conversation.user === userSelected) {
            const filteredMessages = conversation.messages.filter((message) => message.id !== messageId);
            return { ...conversation, messages: filteredMessages };
          }
          return conversation;
        });

        setConversations(updatedConversations);
      })
      .catch((err) => console.log("Error", err));
  };


  const reportMessageById = async (messageId, reportType) => {
    await axios
      .put(`/api/messages/report/${messageId}`, { reportType })
      .then(() => {

        //Update UI State
        const updatedConversations = conversations.map((conversation) => {
          if (conversation.user === userSelected) {
            const updatedMessages = conversation.messages.map((message) => {
              if (message.id === messageId) {
                return { ...message, reportType: reportType };
              }
              return message;
            })
            return { ...conversation, messages: updatedMessages };
          }
          return conversation;
        });

        setConversations(updatedConversations);

        setIsReportMenuVisible(false);
        setReportedMessageId(null);
      })
      .catch((err) => console.log("Error", err));
  };


  function getNewConversation(userId, userName) {

    const conversation = {
      user: `${userId}`,
      name: `${userName}`,
      title: "Software Engineer",
      messages: []
    };
    return conversation;
  }



  function mapMessagesToUI(messagesData, respondent) {

    const messagesUI = {
      user: `${respondent.user}`,
      name: `${respondent.name}`,
      title: "Software Engineer",

      messages: messagesData.map((m) => {

        let message = {
          id: m._id,          
          time: formatTime(m.time),
          datetime: m.time,
          user: m.sender,
          name: (m.sender === currentUser) ? userName : respondent.name,
          message: m.message,
          reportType: m.reportType,
          position: (m.sender === currentUser) ? "end" : "start",
          attachments: m.attachments
        };
        return message;
      }
      )
    };
    return messagesUI;
  }

  function formatTime(time) {

    const date = new Date(time);

    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${month} ${day}, ${hours}:${minutes}`;
  }


  function selectChat(user) {
    setUserSelected(user);
    mobileToggle();
  }

  function mobileToggle() {
    setShowChatFeed(!showChatFeed);
  }

  function getSelectedConversation() {
    return conversations.find(conversation => conversation.user === userSelected);
  }

  function addMessage(messageText, receiver, file, password) {
    const nowTime = new Date();
    if (file) {
      //To enable send a file without message text
      if (messageText.length === 0) {
        messageText = ' ';
      }
      postMessageWithAttachement(currentUser, receiver, messageText, nowTime.toISOString(), file, password);
    }
    else {
      postMessage(currentUser, receiver, messageText, nowTime.toISOString());
    }
  }

  function removeChatItem(user) {
    deleteMessage(currentUser, user);
  }

  function removeMessage(messageId) {
    deleteMessageById(messageId);
  }

  function selectReport(messageId) {
    setReportedMessageId(messageId);
    setIsReportMenuVisible(true);
  }

  function reportMessage(type) {
    reportMessageById(reportedMessageId, type);
  }

  function openPasswordDecrypt(fileUrl, fileName) {
    setIsDecryptFileVisible(true);
    setEncryptedFileName(fileName);
    setEncryptedFileUrl(fileUrl);
  }

  function closePasswordDecrypt() {
    setIsDecryptFileVisible(false);
  }

  function closeReportMenu() {
    setIsReportMenuVisible(false);
    setReportedMessageId(null);
  }


  return (
    <div className='pb-16 sm:pb-0'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Messages</title>
      </Helmet>

      <div className={`${(conversations.length > 0) ? 'hidden' : ''} mt-40`}>
        <h1 className="font-bold text-center">You have no messages</h1>
      </div>

      <div className={`${(conversations.length === 0) ? 'hidden' : ''} w-full sm:w-3/4 md:w-1/2 border m-auto`}>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className={`${showChatFeed ? 'hidden' : ''} sm:hidden p-2`} style={{ fontSize: "24px" }} onClick={mobileToggle}>
            <FaArrowLeft />
          </div>

          <div className={`${!showChatFeed ? 'hidden' : ''} sm:block  col-span-1 border`}>
            <ChatFeed
              conversations={conversations}
              selectChat={selectChat}
              removeChatItem={removeChatItem} />
          </div>

          <div className={`${showChatFeed ? 'hidden' : ''}  sm:block col-span-1 border`}>
            <Chat
              conversation={getSelectedConversation()}
              addMessage={addMessage}
              removeMessage={removeMessage}
              selectReport={selectReport}
              openPasswordDecrypt={openPasswordDecrypt}
            />
          </div>
        </div>
      </div>
      {isReportMenuVisible && <ReportMenu reportMessage={reportMessage} closeReportMenu={closeReportMenu} />}
      {isDecryptFileVisible && <DecryptFile closePasswordDecrypt={closePasswordDecrypt} encryptedFileName={encryptedFileName} encryptedFileUrl={encryptedFileUrl} />}
    </div>
  )
}

export default Messages
