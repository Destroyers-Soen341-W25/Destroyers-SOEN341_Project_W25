import React, { useState, useEffect } from 'react';
import NavigationBar from '../Section/NavigationBar';
import UserInfo from '../Section/UserInfo';
import { ChatProvider } from '../Context/ChatContext';
import DMView from '../Views/DMView';
import GeneralChannelsView from '../Views/GeneralChannelsView';
import PrivateChannelsView from '../Views/PrivateChannelsView';
import CreateChannelView from '../Views/CreateChannelView';
import DestroyersJrWelcome from '../DestroyersJr/DestroyersJrWelcome';

const ChatPage = ({ userRole }) => {
  const [activeView, setActiveView] = useState('dm');
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('welcomed')) {
      setShowWelcome(true);
      sessionStorage.setItem('welcomed', 'true');
    }
  }, []);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dm': return <DMView />;
      case 'general': return <GeneralChannelsView userRole={userRole} setActiveView={setActiveView} />;
      case 'private': return <PrivateChannelsView userRole={userRole} setActiveView={setActiveView} />;
      case 'create': return <CreateChannelView userRole={userRole} setActiveView={setActiveView} />;
      default: return null;
    }
  };

  // Inline styles
  const styles = {
    wrapper: {
      display: 'flex',
      height: '100vh',
      width: '100vw',
      fontFamily: 'Segoe UI, sans-serif',
      background: '#0a0f1a',
      color: '#f1f1f1',
    },
    sidebar: {
      background: '#0c0c0c',
      padding: '20px 10px',
      width: '80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRight: '1px solid #222',
    },
    main: {
      flex: 1,
      padding: '20px',
      background: 'linear-gradient(145deg, #16222A, #3A6073)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
    },
    userInfo: {
      width: '300px',
      background: '#111',
      padding: '20px',
      borderLeft: '1px solid #222',
      overflowY: 'auto',
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
          <div style={styles.main}>
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

export default ChatPage;


