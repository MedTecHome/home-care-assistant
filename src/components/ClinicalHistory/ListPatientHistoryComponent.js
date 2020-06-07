import React, { memo } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import moment from 'moment';
import clsx from 'clsx';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';
import TypeMedicalFormComponent from './TypeHistoryMedicalFormComponent';
import { DETAILS_FORM_TEXT } from '../../commons/globalText';
import EmptyComponent from '../EmptyComponent';
import StandardDetailButtonIcon from '../buttons/StandardDetailButtonIcon';
import useCustomStyles from '../../jss/globalStyles';
import { getPropValue } from '../../helpers/utils';
import PaginationComponent from '../pagination/PaginationComponent';
import IconTestComponent from './IconTextComponent';

const useStyles = makeStyles({
  rootDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    '& > *': {
      margin: 5
    }
  },
  iconTestContainer: {
    alignSelf: 'center',
    verticalAlign: 'middle'
  },
  flexDiv: {
    display: 'flex',
    justifyContent: 'flex-start',
    '& > *': {
      margin: 5
    }
  },
  nameDiv: {
    width: '25%'
  },
  contentDiv: {
    width: '100%',
    display: 'grid',
    gridGap: 10,
    gridTemplateColumns: 'repeat(auto-fit, minmax(40%, 1fr))'
  }
});

function ListPatientHistoryComponent({
  historyList,
  total,
  loadingList,
  setModalVisible,
  selectMedicalForm,
  selected,
  defaultType
}) {
  const classes = useCustomStyles();
  const localClasses = useStyles();

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
            {historyList.map(report => (
              <ListItem
                key={report.id}
                className={clsx(classes.itemList, selected && selected.id === report.id && classes.selectedItemList)}
                divider
                onClick={() => handleSelect(report)}
              >
                <div className={localClasses.rootDiv}>
                  <div className={localClasses.iconTestContainer}>
                    <IconTestComponent type={getPropValue(report, 'type.id')} />
                  </div>
                  <div>
                    <div className={localClasses.flexDiv}>
                      {['recently', 'others', '', undefined].includes(defaultType) ? (
                        <div className={localClasses.nameDiv}>
                          <Typography component="span" className={classes.textLabel}>
                            {getPropValue(report, 'type.id') === 'others'
                              ? report.othersName
                              : getPropValue(report, 'type.name')}
                          </Typography>
                        </div>
                      ) : null}
                      <div className={localClasses.contentDiv}>
                        <TypeMedicalFormComponent data={report} />
                      </div>
                    </div>
                    <div>
                      <Typography variant="body2">
                        <span>Fecha:</span>
                        {moment(moment.unix(report.clinicalDate).toDate()).format('DD/MM/YYYY hh:mma')}
                      </Typography>
                    </div>
                  </div>
                </div>
                <ListItemSecondaryAction>
                  <StandardDetailButtonIcon onClick={() => handleDetailMedicalForm(report)} />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            ;
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
