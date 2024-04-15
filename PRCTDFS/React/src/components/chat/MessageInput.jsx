// MessageInput.jsx
import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex bg-gray-300 text-blue-400 p-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full bg-gray-100 rounded-lg py-2 px-4"
        placeholder="Escribir mensaje..."
      />
      <button type="submit" className="bg-red-800 mx-2 rounded-lg p-2 text-yellow-400">
        Send
      </button>
    </form>
  );
};

export default MessageInput;