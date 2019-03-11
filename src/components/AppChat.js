import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { withRouter } from "react-router-dom";
import ChatMessageList from "./ChatMessageList";
import MessageInput from "./MessageInput";

const styles = theme => ({
  chatLayout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "64px",
    paddingLeft: "320px",
    height: "100%",
    width: "100%",
    overflow: "hidden"
  }
});

const AppChat = ({
  classes,
  messages,
  activeChat,
  activeUser,
  joinChat,
  sendMessage,
  isConnected
}) => (
  <main className={classes.chatLayout}>
    <ChatMessageList messages={messages} activeUser={activeUser} />
    {activeChat && (
      <MessageInput
        disabled={!isConnected}
        sendMessage={sendMessage}
        showJoinButton={!activeUser.isChatMember}
        onJoinButtonClick={() => joinChat(activeChat._id)}
        activeUser={activeUser}
      />
    )}
  </main>
);
AppChat.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      chatId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      sender: PropTypes.object.isRequired,
      createdAt: PropTypes.string.isRequired
    })
  ).isRequired,
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }),
  activeUser: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
    isChatMember: PropTypes.bool.isRequired
  }).isRequired,
  joinChat: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired
};
AppChat.defaultProps = {
  activeChat: null
};

export default withRouter(withStyles(styles)(AppChat));
