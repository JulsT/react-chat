import React from 'react';
import { withStyles } from 'material-ui';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import Modal from 'material-ui/Modal';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  modalWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '30%',
    minWidth: '300px',
    padding: theme.spacing.unit * 3
  }
});

class MenuButton extends React.Component {
  state = {
    anchorEl: null,
    isModalOpen: false,
    username:'',
    firstName: '',
    lastName: ''
  };
  componentWillReceiveProps(nextProps){
    this.setState({
      username: nextProps.activeUser.username,
      firstName: nextProps.activeUser.firstName,
      lastName: nextProps.activeUser.lastName
    })
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleInputChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  toggleEditProfileModal = () =>{
    this.setState({isModalOpen: !this.state.isModalOpen})
    this.handleClose();
  }
  handleSaveClick = () =>{
    this.props.onEditProfileClick({
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    });
    this.toggleEditProfileModal();
  }
  handleLogoutClick = () =>{
    this.props.onLogoutClick();
    this.handleClose();
  }
  render() {
    const {anchorEl, isModalOpen } = this.state;
    const {classes, disabled} = this.props;
    const open = Boolean(anchorEl);
    return (
          <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                  disabled={disabled}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.toggleEditProfileModal}>Edit Profile</MenuItem>
                  <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
                </Menu>
                <Modal
                  open={isModalOpen}
                  className={classes.modalWrapper}
                  onClose={this.toggleEditProfileModal}
                >
                  <Paper className={classes.modal}>
                    <Typography variant="title" id="modal-title">
                      Edit profile
                    </Typography>
                    <TextField
                      required
                      fullWidth
                      name="username"
                      label="Username"
                      placeholder="Enter you username..."
                      type="text"
                      margin="normal"
                      value={this.state.username}
                      onChange={this.handleInputChange}
                    />
                    <TextField
                      fullWidth
                      name="firstName"
                      label="First name"
                      placeholder="Enter you first name..."
                      type="text"
                      margin="normal"
                      value={this.state.firstName}
                      onChange={this.handleInputChange}
                    />
                    <TextField
                      fullWidth
                      name="lastName"
                      label="Last name"
                      placeholder="Enter you last name..."
                      type="text"
                      margin="normal"
                      value={this.state.lastName}
                      onChange={this.handleInputChange}
                    />
                    <Button color="primary" onClick={this.handleSaveClick}>
                      Save
                    </Button>
                    <Button onClick={this.toggleEditProfileModal}>
                      Close
                    </Button>
                  </Paper>
                </Modal>
              </div>
    );
  }
}

export default withStyles(styles)(MenuButton);