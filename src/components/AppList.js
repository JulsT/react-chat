import React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import ExploreIcon from 'material-ui-icons/Explore';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ChatList from './ChatList'; 

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader:{
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 1,
  },
  button: {
    position: 'absolute',
    left: 'auto',
    right: theme.spacing.unit * 3,
    bottom: theme.spacing.unit * 10,
  },

});

const drawerWidth = 320;

const AppList = ({classes, chats}) =>(
    <Drawer
       variant="permanent"
        classes={{
        paper: classes.drawerPaper,
         }}
      >
     <div className={classes.drawerHeader} >
        <TextField
          fullWidth
        margin="normal"
        placeholder="Search chats..."        />
        </div>
        <Divider />
        <ChatList chats={chats} />
        <Button variant="fab" color="primary" aria-label="add" className={classes.button}>
          <AddIcon />
        </Button>
        <BottomNavigation showLabels >
          <BottomNavigationAction label="My Chats" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />  
        </BottomNavigation>
    </Drawer>
);

export default withStyles(styles)(AppList);
