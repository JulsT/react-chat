import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  appBar: {
    position: 'fixed',
    width: `calc(100% - ${drawerWidth}px)`,
  },
});
const drawerWidth = 320;

const AppHeader = ({classes}) =>(
    <AppBar className={classes.appBar}>
                <Toolbar>
                  <Typography variant="title" color="inherit" noWrap>
                    My Chat
                  </Typography>
                </Toolbar>
              </AppBar>
)

export default withStyles(styles)(AppHeader);
