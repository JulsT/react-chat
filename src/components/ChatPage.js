import React from 'react';
import AppHeader from './AppHeader';
import AppList from './AppList.js';
import { withStyles } from 'material-ui/styles';
import AppChat from './AppChat.js'
import {chats, messages} from '../data.json';
const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
})

const ChatPage = ({classes}) =>(
  <div className={classes.root}>
        <AppHeader />
        <AppList chats ={chats}/>
        <AppChat messages={messages}/>
  </div>
  )
  
  
  export default withStyles(styles)(ChatPage);
