import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuButton from './MenuButton';
import Avatar from './Avatar';
import ChatMenu from './ChatMenu';

const drawerWidth = 320;
const styles =(theme)=>( {
  appBar: {
    position: 'fixed',
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: '320px',
  },
  appBarTitle: {
    flex: 1,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    color: theme.palette.secondary.contrastText,
  },
  toolBar:{
    justifyContent: 'space-between'
  },
});


class AppHeader extends React.Component {
  render() {
    const { classes, logout, activeChat, activeUser, leaveChat, deleteChat, editUser } = this.props;

    return (
        <AppBar className={classes.appBar}>
          <Toolbar color='contrast' className={classes.toolBar}>
            {activeChat ? (
              <React.Fragment>
                <Avatar colorAvatar={activeChat._id}>
                  {activeChat.title}
                </Avatar>
                <Typography variant="title" className={classes.appBarTitle}>
                  {activeChat.title}
                  <ChatMenu activeUser={activeUser}
                  onLeaveClick={() => leaveChat(activeChat._id)}
                  onDeleteClick={() => deleteChat(activeChat._id)}
                />
                </Typography>
              </React.Fragment>
            ) : (
              <Typography variant="title" color="inherit" className={classes.grow} noWrap>
              My Chat
            </Typography>
            )}
            <MenuButton activeUser={activeUser}
              onLogoutClick={logout}
              onEditProfileClick={editUser}
            />
          </Toolbar>
        </AppBar>
    
    );
  }
}


export default withStyles(styles)(AppHeader);