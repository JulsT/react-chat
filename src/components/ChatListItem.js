import React from 'react';
import { withStyles } from 'material-ui';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from './Avatar';

const styles = theme => ({
  activeItem: {
    backgroundColor: theme.palette.grey[200],
  }
});
const ChatListItem = ({ classes, title }) => (
  <ListItem
    button 
    //className={classes.activeItem}
  >
    <Avatar colorAvatar={title}>{title}</Avatar>
    <ListItemText primary={title} secondary="Jan 9, 2014"/>
  </ListItem>
);

export default withStyles(styles)(ChatListItem);
