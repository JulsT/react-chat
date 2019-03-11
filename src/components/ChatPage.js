import React from "react";
import PropTypes from "prop-types";
import AppHeader from "./AppHeader";
import AppList from "./AppList.js";
import { withStyles } from "material-ui/styles";
import AppChat from "./AppChat.js";
import ErrorMessage from "./ErrorMessage";

const styles = theme => ({
  root: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class ChatPage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object.isRequired
    }).isRequired,
    error: PropTypes.instanceOf(Error),
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    logout: PropTypes.func.isRequired,
    chats: PropTypes.shape({
      active: PropTypes.object,
      my: PropTypes.array.isRequired,
      all: PropTypes.array.isRequired
    }).isRequired,
    activeUser: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string,
      isMember: PropTypes.bool.isRequired,
      isCreator: PropTypes.bool.isRequired,
      isChatMember: PropTypes.bool.isRequired
    }).isRequired,
    createChat: PropTypes.func.isRequired,
    joinChat: PropTypes.func.isRequired,
    leaveChat: PropTypes.func.isRequired,
    deleteChat: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        chatId: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        sender: PropTypes.object.isRequired,
        createdAt: PropTypes.string.isRequired
      })
    ).isRequired,
    editUser: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired,
    fetchAllChats: PropTypes.func.isRequired,
    fetchMyChats: PropTypes.func.isRequired,
    setActiveChat: PropTypes.func.isRequired,
    mountChat: PropTypes.func.isRequired,
    unmountChat: PropTypes.func.isRequired,
    socketConnect: PropTypes.func.isRequired
  };
  static defaultProps = {
    error: null
  };
  componentDidMount() {
    const {
      match,
      fetchAllChats,
      fetchMyChats,
      setActiveChat,
      socketConnect,
      mountChat
    } = this.props;

    Promise.all([fetchAllChats(), fetchMyChats()])
      .then(() => {
        socketConnect();
      })
      .then(() => {
        const { chatId } = match.params;
        // If we pass a chatId, then fetch messages from chat
        if (chatId) {
          setActiveChat(chatId);
          mountChat(chatId);
        }
      });
  }
  componentWillReceiveProps(nextProps) {
    const {
      match: { params },
      setActiveChat,
      mountChat,
      unmountChat
    } = this.props;
    const { params: nextParams } = nextProps.match;

    // If we change route, then fetch messages from chat by chatID
    if (nextParams.chatId && params.chatId !== nextParams.chatId) {
      setActiveChat(nextParams.chatId);
      unmountChat(params.chatId);
      mountChat(nextParams.chatId);
    }
  }
  render() {
    const {
      classes,
      logout,
      chats,
      activeUser,
      createChat,
      joinChat,
      leaveChat,
      deleteChat,
      sendMessage,
      messages,
      editUser,
      error,
      isConnected
    } = this.props;
    return (
      <div className={classes.root}>
        <AppHeader
          isConnected={isConnected}
          logout={logout}
          activeChat={chats.active}
          activeUser={activeUser}
          leaveChat={leaveChat}
          deleteChat={deleteChat}
          editUser={editUser}
        />
        <AppList
          isConnected={isConnected}
          chats={chats}
          createChat={createChat}
        />
        <AppChat
          isConnected={isConnected}
          messages={messages}
          activeChat={chats.active}
          activeUser={activeUser}
          sendMessage={sendMessage}
          joinChat={joinChat}
        />
        <ErrorMessage error={error} />
      </div>
    );
  }
}

export default withStyles(styles)(ChatPage);
