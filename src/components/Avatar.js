import React from "react";
import MUIAvatar from "material-ui/Avatar";
import getColor from "../utils/color-avatar";
import titleInitials from "../utils/title-initials";
import PropTypes from "prop-types";
const Avatar = ({ colorAvatar, children, ...rest }) => (
  <MUIAvatar style={{ backgroundColor: getColor(colorAvatar) }} {...rest}>
    {titleInitials(children)}
  </MUIAvatar>
);
Avatar.propTypes = {
  colorAvatar: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};
export default Avatar;
