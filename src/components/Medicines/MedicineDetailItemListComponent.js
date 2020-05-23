import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Typography, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import EditButtonIcon from '../buttons/EditButtonIcon';

const useStyles = makeStyles({
  listText: {
    maxWidth: '90%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 600
  },
  tag: {
    borderRadius: 2,
    borderBottom: '1px solid #ccc'
  }
});

function MedicineDetailItemListComponent({ medicines, selected, handleEditMedicine }) {
  const classes = useStyles();
  return (
    <List>
      {medicines.map(medicine => (
        <ListItem
          key={medicine.id}
          className={classes.tag}
          style={{
            backgroundColor: selected && selected.id === medicine.id ? '#f5f5f6' : 'inherit',
            width: selected && selected.id === medicine.id ? '103%' : '100%'
          }}
        >
          <ListItemText primary={<Typography className={classes.listText}>{medicine.name}</Typography>} />
          <ListItemText primary={<Typography className={classes.listText}>{medicine.frequency}</Typography>} />
          <ListItemText
            primary={<Typography className={classes.listText}>{medicine.edited && 'Editado'}</Typography>}
          />
          {handleEditMedicine && (
            <ListItemSecondaryAction>
              <EditButtonIcon onClick={() => handleEditMedicine(medicine)} />
            </ListItemSecondaryAction>
          )}
        </ListItem>
      ))}
    </List>
  );
}

export default MedicineDetailItemListComponent;
