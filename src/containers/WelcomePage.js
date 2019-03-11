import {connect} from 'react-redux';
import WelcomePage from '../components/WelcomePage';
import { signup, login } from "../actions";
import {bindActionCreators} from 'redux';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.services.errors.auth
});

const mapDispatchToProps = dispatch => bindActionCreators({
  signup,
  login,
}, dispatch);

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage);
