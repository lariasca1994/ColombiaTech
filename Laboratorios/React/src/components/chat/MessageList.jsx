// MessageList.jsx
import React from 'react';

const MessageList = ({ messages, user }) => {
  return (
    <div className="flex flex-col space-y-2 bg-slate-50">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`${
            message.from && user._id === message.from._id
              ? 'bg-pink-300 self-end'
              : 'bg-blue-300 self-start'
          } text-gray-700 py-2 px-4 rounded-lg max-w-xs`}
        >
          <p>{message.body}</p>
          <span className="text-xs text-gray-100 self-end">
            {message.createdAt}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;