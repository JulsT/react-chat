import React from 'react';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import ChatListItem from './ChatListItem';
import { Link } from 'react-router-dom';

const styles = theme =>({
  chatList:{
    height: 'calc(100% - 64px)',
    overflow: 'scroll'
  },
  avatar: {
    margin: 2,
  },
  noChats: {
    textAlign: 'center',
  }
}) 

const ChatList = ({classes, chats, activeChat}) =>(
  <List className={classes.chatList}>
          { chats && chats.length ? (
              chats && chats.map((chat) =>(
                <ChatListItem 
                component={Link}
                to={`/chat/${chat._id}`}
                  key={chat._id} 
                  active={Boolean(activeChat && activeChat._id === chat._id)}
                  chatId={chat._id}
                  {...chat}
                />
          ))) : (
            <Typography variant='subheading' className={classes.noChats}>
              There is no chats yet!
            </Typography>
          )
          }
  </List>
)

export default withStyles(styles)(ChatList);
