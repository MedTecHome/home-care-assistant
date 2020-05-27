import React, { memo } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import moment from 'moment';
import clsx from 'clsx';
import LinearProgress from '@material-ui/core/LinearProgress';
import { usePatientHistoryContext } from './PatientHistoryContext';
import TypeMedicalFormComponent from './TypeHistoryMedicalFormComponent';
import { DETAILS_FORM_TEXT } from '../../commons/globalText';
import EmptyComponent from '../EmptyComponent';
import StandardDetailButtonIcon from '../buttons/StandardDetailButtonIcon';
import useCustomStyles from '../../jss/globalStyles';
import { getPropValue } from '../../helpers/utils';
import PaginationComponent from '../pagination/PaginationComponent';

function ListPatientHistoryComponent() {
  const { historyList, total, loadingList, setModalVisible, selectMedicalForm, selected } = usePatientHistoryContext();
  const classes = useCustomStyles();

  const handleSelect = el => {
    selectMedicalForm(el);
  };

  const handleDetailMedicalForm = el => {
    setModalVisible(true, DETAILS_FORM_TEXT);
    handleSelect(el);
  };

  return (
    <>
      {loadingList ? (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      ) : (
        <>
          <List className={classes.root}>
            {historyList.length === 0 && <EmptyComponent />}
            {historyList.map(report => {
              return (
                <ListItem
                  key={report.id}
                  className={clsx(classes.itemList, selected && selected.id === report.id && classes.selectedItemList)}
                  divider
                  onClick={() => handleSelect(report)}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={4}>
                      <Typography component="span" className={classes.textLabel}>
                        {getPropValue(report, 'type.name')}
                      </Typography>
                    </Grid>
                    <TypeMedicalFormComponent data={report} />
                    <Grid item xs={12} className={classes.extraText}>
                      <Typography variant="body2">
                        <span className={classes.textLabel}>Fecha:</span>
                        {moment(moment.unix(report.clinicalDate).toDate()).format('DD/MM/YYYY hh:mma')}
                      </Typography>
                    </Grid>
                  </Grid>
                  <ListItemSecondaryAction>
                    <StandardDetailButtonIcon onClick={() => handleDetailMedicalForm(report)} />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
          <PaginationComponent
            total={total}
            first={getPropValue(historyList[0], 'clinicalDate')}
            last={getPropValue(historyList[historyList.length - 1], 'clinicalDate')}
          />
        </>
      )}
    </>
  );
}

export default memo(ListPatientHistoryComponent);
