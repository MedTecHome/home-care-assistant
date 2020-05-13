import React, { memo } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import clsx from 'clsx';
import LinearProgress from '@material-ui/core/LinearProgress';
import { usePatientHistoryContext } from './PatientHistoryContext';
import TypeMedicalFormComponent from './TypeHistoryMedicalFormComponent';
import { DETAILS_FORM_TEXT } from '../../commons/globalText';
import EmptyComponent from '../EmptyComponent';
import StandarDetailButtonIcon from '../buttons/StandarDetailButtonIcon';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiListItemText-root': {
      flex: 1
    }
  },
  listItems: {
    marginBottom: 5,
    background: theme.palette.background.paper,
    '&:hover': {
      background: '#f5f5f6'
    },
    '& *': {
      fontSize: '0.750rem'
    }
  },
  title: {
    fontWeight: 800
  }
}));

function ListPatientHistoryComponent() {
  const { historyList, loadingList, setModalVisible, selectMedicalForm, selected } = usePatientHistoryContext();
  const classes = useStyles();

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
                <Grid container>
                  <Grid item xs={12} container>
                    <Grid item xs={6}>
                      <Typography variant="button" className={classes.title}>
                        {report.type ? report.type.name : '?'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TypeMedicalFormComponent data={report} type={report.type} />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} container>
                    <Grid item xs={6} />
                    <Grid item xs={6} />
                  </Grid>
                  <Grid item xs={12} container>
                    <Grid item xs={6}>
                      <Typography component="span" variant="body2" color="textPrimary">
                        {`Fecha: ${
                          moment(report.date.toDate()).isValid()
                            ? moment(report.date.toDate()).format('DD/MM/YYYY hh:mm a')
                            : ' - '
                        }`}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} />
                  </Grid>
                </Grid>
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
