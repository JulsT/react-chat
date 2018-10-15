import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import ChatMessage from './ChatMessage';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  messagesWrapper: {
    overflowX: 'scroll',
    height: '100%',
    width: '100%',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: '120px',
  },
  paper: {
    padding: theme.spacing.unit * 3
  }
});

class ChatMessageList extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
      chatId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      sender: PropTypes.object.isRequired,
      createdAt: PropTypes.string.isRequired,
    })),
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }).isRequired,
    activeUser: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string,
      isMember: PropTypes.bool.isRequired,
      isCreator: PropTypes.bool.isRequired,
      isChatMember: PropTypes.bool.isRequired,
    }).isRequired,
  };
  componentDidMount() {
    this.scrollDownHistory();
  }

  componentDidUpdate() {
    this.scrollDownHistory();
  }

  scrollDownHistory() {
    const messagesWrapper = this.refs.messagesWrapper;
    if (messagesWrapper) {
      messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
    }
  }

  render() {
    const { classes, messages, match, activeUser } = this.props;
    if(!match.params.chatId){
      return(
        <Paper className={classes.paper}>
            <Typography variant="display1" gutterBottom>
              Start messaging…
            </Typography>
            <Typography variant="body1" gutterBottom>
              Use <strong>Global</strong> to explore communities around here.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Use <strong>Recents</strong> to see your recent conversations.
            </Typography>
          </Paper>
      )
    }
    return messages && messages.length ? (
      <div className={classes.messagesWrapper} ref="messagesWrapper">
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            {...message} 
            activeUser={activeUser} 
          />
        ))}
      </div>
    ) : (
      <Typography variant="display1">
          There is no messages yet...
      </Typography>
    )
  }
}

export default withRouter(withStyles(styles)(ChatMessageList));
