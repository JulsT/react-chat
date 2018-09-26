import history from '../utils/history';
import * as types from '../constans';

export function redirect(to) {
    return (dispatch) => {
     history.push(`${process.env.PUBLIC_URL}/${to}`);
      dispatch({
        type: types.REDIRECT,
        payload: { to },
      });
    }
  }
