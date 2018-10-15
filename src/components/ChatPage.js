import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from './AppHeader';
import AppList from './AppList.js';
import { withStyles } from 'material-ui/styles';
import AppChat from './AppChat.js'

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
})

class ChatPage extends React.Component{
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }).isRequired,
    error: PropTypes.instanceOf(Error),
  }
  static defaultProps = {
    error: null,
  };
  componentDidMount(){
    const {match,fetchAllChats, fetchMyChats, setActiveChat} = this.props;
    console.log('==========', match);

    Promise.all([
      fetchAllChats(),
      fetchMyChats()
    ])
    
    .then(() => {
      const { chatId } = match.params;
      // If we pass a chatId, then fetch messages from chat
      if (chatId) {
        setActiveChat(match.params.chatId);
      }
    })
  }
  componentWillReceiveProps(nextProps) {
    const { match: { params }, setActiveChat } = this.props;
    const { params: nextParams } = nextProps.match;

    // If we change route, then fetch messages from chat by chatID
    if (nextParams.chatId && params.chatId !== nextParams.chatId) {
      setActiveChat(nextParams.chatId);
    }
}
  render(){
    const {
      classes, logout, chats, activeUser,
      createChat, joinChat, leaveChat, deleteChat, sendMessage,
      messages, editUser
    } = this.props;
        return(
          <div className={classes.root}>
            <AppHeader 
              logout={logout}
              activeChat={chats.active}
              activeUser={activeUser}
              leaveChat={leaveChat}
              deleteChat={deleteChat}
              editUser={editUser}
            />
            <AppList 
              chats ={chats} 
              createChat={createChat}
            />
            <AppChat 
              messages={messages} 
              activeChat={chats.active} 
              activeUser={activeUser}
              sendMessage={sendMessage}
              joinChat={joinChat}
            />
          </div>

    )
  }
}

export default withStyles(styles)(ChatPage);
