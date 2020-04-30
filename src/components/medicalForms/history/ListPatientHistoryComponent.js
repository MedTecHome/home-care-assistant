import React, { memo } from 'react';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import { useMediaQuery } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTemperatureHigh, faQuestionCircle, faWeight } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { usePatientHistoryContext } from './PatientHistoryContext';
import TypeMedicalFormComponent from './TypeHistoryMedicalFormComponent';
import { findByIdePatientMedicalForm } from '../Nomenc';
import { DETAILS_FORM_TEXT } from '../../../commons/globalText';

const useStyles = makeStyles({
  root: {
    '& .MuiListItemText-root': {
      flex: 1,
    },
  },
  listItems: {
    marginBottom: 10,
    '&:hover': {
      background: '#f5f5f6',
    },
    listItemsSelected: {
      background: '#666666',
    },
  },
});

function ListPatientHistoryComponent() {
  const { historyList, loadingList, setModalVisible, selectMedicalForm, selected } = usePatientHistoryContext();
  const classes = useStyles();
  const match = useMediaQuery(theme => theme.breakpoints.down(700));
  const handleDetailMedicalForm = el => {
    setModalVisible(true, DETAILS_FORM_TEXT);
    selectMedicalForm(el);
  };

  return (
    <List className={classes.root}>
      {loadingList && <CircularProgress size={25} />}
      {historyList.map(report => {
        const typeMedicalForm = findByIdePatientMedicalForm(report.type);
        return (
          <ListItem
            key={report.id}
            alignItems="flex-start"
            className={clsx(classes.listItems, selected && selected.id === report.id && classes.listItemsSelected)}
            divider
          >
            <ListItemAvatar>
              <Avatar>
                <FontAwesomeIcon
                  icon={
                    (report.type === 'temprature' && faTemperatureHigh) ||
                    (report.type === 'weight' && faWeight) ||
                    faQuestionCircle
                  }
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h6">{report.type ? typeMedicalForm.name : '?'}</Typography>}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="textPrimary">
                    {`Fecha: ${
                      moment(report.date.toDate()).isValid()
                        ? moment(report.date.toDate()).format('DD/MM/YYYY hh:mm a')
                        : ' - '
                    }`}
                  </Typography>
                </>
              }
            />
            {!match && (
              <ListItemText>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TypeMedicalFormComponent data={report} type={typeMedicalForm} />
                  </Grid>
                </Grid>
              </ListItemText>
            )}
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleDetailMedicalForm(report)}>
                <FontAwesomeIcon icon={faInfoCircle} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

export default memo(ListPatientHistoryComponent);
