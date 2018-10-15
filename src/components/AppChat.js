import React from 'react';
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router-dom';
import ChatMessageList from './ChatMessageList';
import MessageInput from './MessageInput';

const styles = theme => ({
  chatLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '64px',
    paddingLeft: '320px',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
});

const AppChat = ({ classes, messages, activeChat, activeUser, joinChat, sendMessage  }) => (
  
  <main className={classes.chatLayout}>
    <ChatMessageList messages={messages} activeUser={activeUser}/>
    {activeChat && (<MessageInput sendMessage={(content) => sendMessage(activeChat._id, content)} 
      showJoinButton={!activeUser.isChatMember}
      onJoinButtonClick={() => joinChat(activeChat._id)}
      activeUser={activeUser}
    />
    
    )}
    
  </main>
);

export default withRouter(withStyles(styles)(AppChat));
