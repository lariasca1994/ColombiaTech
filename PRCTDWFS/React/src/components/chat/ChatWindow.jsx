// ChatWindow.jsx
import React, { useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, receiveMessage } from '../features/chatSlice';
import io from 'socket.io-client';

const ChatWindow = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const user = useSelector((state) => state.auth.user);
  const endReference = useRef(null);

  useEffect(() => {
    const socket = io('http://localhost:3000', {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('message-receipt', (data) => {
      dispatch(receiveMessage(data));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const handleSendMessage = (message) => {
    const payload = {
      body: message,
      from: user._id,
      to: user._id, // !NOTE: Id del destinatario, se debería obtener previamente, para el ejemplo dejamos el mismo del FROM
    };
    dispatch(sendMessage(payload));
    socket.emit('message', JSON.stringify(payload));
  };

  const scrollToBottom = () => {
    endReference.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="max-w-4xl w-full mx-auto px-5 py-5">
      <div className="bg-green-300 text-gray-800 p-4">
        <h1 className="text-lg font-semibold">Chat</h1>
      </div>
      <MessageList messages={messages} user={user} />
      <div ref={endReference} />
      <hr />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;