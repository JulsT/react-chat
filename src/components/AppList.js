import React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import ExploreIcon from 'material-ui-icons/Explore';
import ChatList from './ChatList'; 
import NewChatButton from './NewChatButton';

const styles = theme => ({
  drawerPaper: {
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader:{
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 1,
  },
});

const drawerWidth = 320;

class AppList extends React.Component{
  state = {
    searchValue: '',
    activeTab: 0,
  };
  handleSearchChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
  };

  handleTabChange = (event, value) => {
    this.setState({
      activeTab: value,
    });
  };

  filterChats = (chats) => {
    const { searchValue } = this.state;

    return chats
      .filter(chat => chat.title.toLowerCase().includes(searchValue.toLowerCase()))
      .sort((one, two) => (one.title.toLowerCase() <= two.title.toLowerCase() ? -1 : 1));
  };
  render(){
    const {classes, chats, createChat} = this.props
    const { activeTab, searchValue } = this.state;

    return(
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
          placeholder="Search chats..."  
          value={searchValue}
          onChange={this.handleSearchChange} 
        />
        </div>
        <Divider />
        <ChatList chats={this.filterChats(activeTab === 0 ? chats.my : chats.all)}
          activeChat={chats.active}/>
        <NewChatButton onClick={createChat}/>
        <BottomNavigation 
          value={activeTab}
          onChange={this.handleTabChange}
          showLabels 
        >
          <BottomNavigationAction label="My Chats" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />  
        </BottomNavigation>
    </Drawer>

    )
  }
};

export default withStyles(styles)(AppList);
