import React, { memo } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import { useMediaQuery } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faQuestionCircle, faWeight } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import LinearProgress from '@material-ui/core/LinearProgress';
import { usePatientHistoryContext } from './PatientHistoryContext';
import TypeMedicalFormComponent from './TypeHistoryMedicalFormComponent';
import { DETAILS_FORM_TEXT } from '../../../commons/globalText';
import EmptyComponent from '../../EmptyComponent';
import StandarDetailButtonIcon from '../../buttons/StandarDetailButtonIcon';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiListItemText-root': {
      flex: 1,
    },
  },
  listItems: {
    marginBottom: 5,
    background: theme.palette.background.paper,
    '&:hover': {
      background: '#f5f5f6',
    },
    listItemsSelected: {
      background: '#666666',
    },
  },
}));

function ListPatientHistoryComponent() {
  const { historyList, loadingList, setModalVisible, selectMedicalForm, selected } = usePatientHistoryContext();
  const classes = useStyles();
  const match = useMediaQuery(theme => theme.breakpoints.down(700));

  const handleDetailMedicalForm = el => {
    setModalVisible(true, DETAILS_FORM_TEXT);
    selectMedicalForm(el);
  };

  return (
    <>
      {loadingList ? (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      ) : (
        <List className={classes.root}>
          {historyList.length === 0 && <EmptyComponent />}
          {historyList.map(report => {
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
                        (report.type === 'temperature' && faTemperatureHigh) ||
                        (report.type === 'weight' && faWeight) ||
                        faQuestionCircle
                      }
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="h6">{report.type ? report.type.name : '?'}</Typography>}
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
                        <TypeMedicalFormComponent data={report} type={report.type} />
                      </Grid>
                    </Grid>
                  </ListItemText>
                )}
                <ListItemSecondaryAction>
                  <StandarDetailButtonIcon onClick={() => handleDetailMedicalForm(report)} />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
}

export default memo(ListPatientHistoryComponent);
