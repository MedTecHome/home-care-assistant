import React, { memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';

function ToolbarProfileComponent({ onClickAdd }) {
  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <IconButton color="primary" onClick={onClickAdd}>
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </ListItemAvatar>
      </ListItem>
      <Divider />
    </List>
  );
}

export default memo(ToolbarProfileComponent);
