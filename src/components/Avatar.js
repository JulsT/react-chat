import React from 'react';
import MUIAvatar from 'material-ui/Avatar';
import getColor from '../utils/color-avatar';
import titleInitials from '../utils/title-initials';
const Avatar =({colorAvatar,children, ...rest}) =>(
  <MUIAvatar style={{backgroundColor: getColor(colorAvatar)}} {...rest}>
    {titleInitials(children)}
  </MUIAvatar>
)
export default Avatar;
