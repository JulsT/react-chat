import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui";
import { ListItem, ListItemText } from "material-ui/List";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import moment from "moment";

const styles = theme => ({
  activeItem: {
    backgroundColor: theme.palette.grey[200]
  }
});
const ChatListItem = ({
  classes,
  title,
  disabled,
  chatId,
  active,
  createdAt
}) => (
  <ListItem
    button
    className={active ? classes.activeItem : ""}
    component={Link}
    to={`/chat/${chatId}`}
    disabled={disabled}
  >
    <Avatar colorAvatar={chatId}>{title}</Avatar>
    <ListItemText primary={title} secondary={moment(createdAt).fromNow()} />
  </ListItem>
);
ChatListItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  chatId: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired
};
export default withStyles(styles)(ChatListItem);
