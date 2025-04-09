import React, { useState, useEffect } from 'react';
import DMView from "../Views/DMView";
import GeneralChannelsView from "../Views/GeneralChannelsView";
import PrivateChannelsView from "../Views/PrivateChannelsView";
import CreateChannelView from "../Views/CreateChannelView";
import DestroyersJrWelcome from '../DestroyersJr/DestroyersJrWelcome';
import { ChatProvider } from "../Context/ChatContext";
import NavigationBar from "../Section/NavigationBar";
import UserInfo from "../Section/UserInfo";

const ChatPage = ({ userRole }) => {
  const [activeView, setActiveView] = useState('dm');
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const alreadyWelcomed = sessionStorage.getItem('welcomed');
    if (!alreadyWelcomed) {
      setShowWelcome(true);
      sessionStorage.setItem('welcomed', 'true');
    }
  }, []);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dm':
        return <DMView />;
      case 'general':
        return <GeneralChannelsView userRole={userRole} setActiveView={setActiveView} />;
      case 'private':
        return <PrivateChannelsView userRole={userRole} setActiveView={setActiveView} />;
      case 'create':
        return <CreateChannelView userRole={userRole} setActiveView={setActiveView} />;
      default:
        return null;
    }
  };

  return (
    <>
      {showWelcome && <DestroyersJrWelcome onClose={() => setShowWelcome(false)} />}

      <ChatProvider>
        <div style={styles.wrapper}>
          <div style={styles.sidebar}>
            <NavigationBar setActiveView={setActiveView} />
          </div>

          <div style={styles.content}>
            {renderActiveView()}
          </div>

          <div style={styles.userInfo}>
            <UserInfo />
          </div>
        </div>
      </ChatProvider>
    </>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    overflow: 'hidden'
  },
  sidebar: {
    width: '220px',
    background: '#111',
    padding: '10px',
    borderRight: '1px solid #333',
    boxShadow: '2px 0 8px rgba(0,0,0,0.4)',
    zIndex: 1
  },
  content: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    backdropFilter: 'blur(4px)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  userInfo: {
    width: '220px',
    background: '#111',
    padding: '10px',
    borderLeft: '1px solid #333',
    boxShadow: '-2px 0 8px rgba(0,0,0,0.4)',
  }
};

export default ChatPage;

