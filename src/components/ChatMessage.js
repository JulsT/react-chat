import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "material-ui";
import Typography from "material-ui/Typography";
import Avatar from "./Avatar";
import Paper from "material-ui/Paper";
import moment from "moment";
import senderName from "../utils/sender-name";
import colorAvatar from "../utils/color-avatar";

const styles = theme => ({
  messageWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`
  },
  messageWrappperFromMe: {
    justifyContent: "flex-end"
  },
  message: {
    maxWidth: "70%",
    minWidth: "10%",
    padding: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2
  },
  messageFromMe: {
    marginRight: theme.spacing.unit * 2,
    backgroundColor: "#e6dcff"
  },
  statusMessage: {
    width: "100%",
    textAlign: "center"
  },
  statusMessageUser: {
    display: "inline"
  }
});

const ChatMessage = ({
  classes,
  sender,
  content,
  activeUser,
  createdAt,
  statusMessage
}) => {
  const isMessageFromMe = sender._id === activeUser._id;
  const displayName = senderName(sender);
  if (statusMessage) {
    return (
      <div className={classes.messageWrapper}>
        <Typography className={classes.statusMessage}>
          <Typography
            variant="caption"
            style={{ color: colorAvatar(sender._id) }}
            className={classes.statusMessageUser}
          >
            {displayName}
          </Typography>
          {content}
          <Typography variant="caption" component="span">
            {moment(createdAt).fromNow()}
          </Typography>
        </Typography>
      </div>
    );
  }

  const userAvatar = <Avatar colorAvatar={sender._id}>{displayName}</Avatar>;

  return (
    <div
      className={classNames(
        classes.messageWrapper,
        isMessageFromMe && classes.mesageWrappperFromMe
      )}
    >
      {!isMessageFromMe && userAvatar}
      <Paper
        className={classNames(
          classes.message,
          isMessageFromMe && classes.messageFromMe
        )}
      >
        <Typography
          variant="caption"
          style={{ color: colorAvatar(sender._id) }}
        >
          {displayName}
        </Typography>
        <Typography variant="body1">{content}</Typography>
        <Typography variant="caption" className={classes.time}>
          {moment(createdAt).fromNow()}
        </Typography>
      </Paper>
      {isMessageFromMe && userAvatar}
    </div>
  );
};
ChatMessage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  sender: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string
  }).isRequired,
  content: PropTypes.string.isRequired,
  activeUser: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  statusMessage: PropTypes.bool
};

ChatMessage.defaultProps = {
  statusMessage: false
};
export default withStyles(styles)(ChatMessage);
