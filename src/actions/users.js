import * as types from "../constans/users";
import callApi from "../utils/call-api";

export function editUser({ username, firstName, lastName }) {
  return (dispatch, getState) => {
    const { token } = getState().auth;
    const { isFetching } = getState().services;
    if (isFetching.editUser) {
      return Promise.resolve();
    }
    dispatch({
      type: types.EDIT_USER_REQUEST
    });
    return callApi(
      "/users/me",
      token,
      { method: "POST" },
      {
        data: { username, firstName, lastName }
      }
    )
      .then(json =>
        dispatch({
          type: types.EDIT_USER_SUCCESS,
          payload: json
        })
      )
      .catch(reason =>
        dispatch({
          type: types.EDIT_USER_FAILURE,
          payload: reason
        })
      );
  };
}
