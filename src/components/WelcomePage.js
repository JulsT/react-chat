import React from "react";
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { Redirect } from "react-router-dom";

const styles = theme => ({
  appBarWelcome: {
    width: `100%`,
  },
  mainContent:{
    display: 'flex',
    justifyContent: 'center'
  },
  paper:{
    marginTop: 64 + theme.spacing.unit * 3,
    width: 500,
  },
  tabContent: {
    padding: theme.spacing.unit * 3,
  }
});
class WelcomePage extends React.Component {
  state = {
    activeTab: 0,
  };
  
  handleTabChange = (event, value) => {
    this.setState({ activeTab: value });
  };
  render(){
    const {classes, signup, login, isAuthenticated }= this.props;
    const { activeTab } = this.state;

    if(isAuthenticated){
      return <Redirect to='/chat' />
    }

    return (
      <React.Fragment>
        <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                My Chat
              </Typography>
            </Toolbar>
        </AppBar>
        <main className={classes.mainContent}>
            <Paper className={classes.paper} >
              <AppBar position="static">
                <Tabs value={activeTab} onChange={this.handleTabChange} fullWidth>
                  <Tab label="Login" />
                  <Tab label="Sign up" />
                </Tabs>
              </AppBar>
              <div className={classes.tabContent}>
                {activeTab === 0 && <LoginForm onSubmit={login}/>}
                {activeTab === 1 && <SignUpForm onSubmit={signup}/>}
              </div>
            </Paper>
        </main>
      </React.Fragment>
    )
  }
}
export default withStyles(styles)(WelcomePage);
