import React from 'react';
import { withStyles } from 'material-ui';
import { ListItem, ListItemText } from 'material-ui/List';
import {Link} from 'react-router-dom';
import Avatar from './Avatar';
import moment from 'moment'

const styles = theme => ({
  activeItem: {
    backgroundColor: theme.palette.grey[200],
  }
});
const ChatListItem = ({ classes, title, disabled, chatId, active, createdAt }) => (
  <ListItem
    button 
    className={active? classes.activeItem : ''}
    component=  {Link}
    to={`/chat/${chatId}`}
    disabled= {disabled}
  >

    <Avatar colorAvatar={chatId}>{title}</Avatar>
    <ListItemText primary={title} secondary={moment(createdAt).fromNow()}/>
  </ListItem>
);

export default withStyles(styles)(ChatListItem);
