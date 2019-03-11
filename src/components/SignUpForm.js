import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  signUpButton: {
    marginTop: theme.spacing.unit * 2
  }
});

class SignUpForm extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    onSubmit: PropTypes.func.isRequired
  };
  state = {
    username: {
      value: "",
      isValid: true
    },
    password: {
      value: "",
      isValid: true
    },
    repeatedPassword: {
      value: "",
      isValid: true
    }
  };
  validate = () => {
    const { password, repeatedPassword } = this.state;
    const isValid = password.value === repeatedPassword.value;

    this.setState({
      password: { ...password, isValid },
      repeatedPassword: { ...repeatedPassword, isValid }
    });

    return isValid;
  };
  handleInputChange = event => {
    event.persist();
    const { name, value } = event.target;

    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        value
      }
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.validate()) {
      return;
    }
    const { username, password } = this.state;
    console.log("signup:", username.value, password.value);

    this.props.onSubmit(username.value, password.value);
  };

  render() {
    const { classes } = this.props;
    const { username, password, repeatedPassword } = this.state;
    return (
      <form className={classes.container} onSubmit={this.handleSubmit}>
        <TextField
          fullWidth
          required
          label="Username"
          placeholder="Type your login..."
          type="text"
          name="username"
          autoComplete="username"
          value={username.value}
          onChange={this.handleInputChange}
          error={!username.isValid}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          label="Password"
          placeholder="Type your password..."
          type="password"
          name="password"
          margin="normal"
          autoComplete="current-password"
          value={password.value}
          onChange={this.handleInputChange}
          error={!password.isValid}
        />
        <TextField
          required
          fullWidth
          label="Repeat password"
          placeholder="Repeat your password..."
          type="password"
          margin="normal"
          name="repeatedPassword"
          autoComplete="new-password"
          value={repeatedPassword.value}
          onChange={this.handleInputChange}
          error={!repeatedPassword.isValid}
        />
        <Button
          fullWidth
          type="submit"
          variant="raised"
          color="primary"
          className={classes.signUpButton}
        >
          Sign Up
        </Button>
      </form>
    );
  }
}
export default withStyles(styles)(SignUpForm);
