//Messages
//Author: Daria Koroleva
//Created: March 5,2023
//Description: Show user conversations with others and last message

import React from 'react'
import ChatItem from './ChatItem'

function ChatFeed(props) {

  const { conversations, selectChat, removeChatItem } = props;

  function getAge(time) {
    const current = new Date();
    const datetime = new Date(time);

    const difference = current - datetime;

    const sec = 1000;
    const min = 60 * sec;
    const hour = 60 * min;
    const day = 24 * hour;
    const week = 7 * day;

    if (difference < min) {
      return `${Math.round(difference / sec)}s`;
    }
    else if (difference < hour) {
      return `${Math.round(difference / min)}m`;
    }
    else if (difference < day) {
      return `${Math.round(difference / hour)}h`;
    }
    else if (difference < week) {
      return `${Math.round(difference / day)}d`;
    }
    else {
      return `${Math.round(difference / week)}w`;
    }

  }

  if (conversations.length === 0) {
    return null;
  }

  return (
    <div>

      {
        conversations.map((conversation) => {
          return (
            <div key={conversation.user}>
              <ChatItem
                user={conversation.user}
                name={conversation.name}
                lastmessage={(conversation.messages.length === 0) ? '' : conversation.messages[conversation.messages.length - 1].message}
                time={(conversation.messages.length === 0) ? '' : getAge(conversation.messages[conversation.messages.length - 1].datetime)}
                selectChat={selectChat}
                removeChatItem={removeChatItem} />
            </div>
          )
        })
      }

    </div>
  )
}

export default ChatFeed