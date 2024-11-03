// src/components/ChatLayout.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import io from 'socket.io-client';
import ChatRoom from './ChatRoom';
import RoomList from './RoomList';
import CreateRoom from './CreateRoom';
import PrivateMessageList from './PrivateMessageList';
import PrivateMessageThread from './PrivateMessageThread';

const ChatLayout = () => {
  const { token, username } = useAuth();
  const [socket, setSocket] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedPrivateConversation, setSelectedPrivateConversation] = useState(null);
  const [rooms, setRooms] = useState([]);

  // ... (existing code)

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-800 p-4">
        <CreateRoom onRoomCreated={fetchRooms} />
        <RoomList
          rooms={rooms}
          selectedRoom={selectedRoom}
          onRoomSelect={setSelectedRoom}
        />
        <PrivateMessageList
          onPrivateConversationSelect={setSelectedPrivateConversation}
        />
      </div>
      <div className="flex-1">
        {selectedRoom ? (
          <ChatRoom
            room={selectedRoom}
            socket={socket}
            username={username}
          />
        ) : selectedPrivateConversation ? (
          <PrivateMessageThread recipient={selectedPrivateConversation} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a room or a private conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;