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
import { getPropValue, compareStringTagName } from '../../helpers/utils';
import PaginationComponent from '../pagination/PaginationComponent';
import IconTestComponent from './IconTestComponent';
import { testFormsNames } from '../../helpers/constants';

const useStyles = makeStyles({
  rootDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  iconTestContainer: {
    alignSelf: 'center',
    verticalAlign: 'middle'
  },
  itemContent: {
    marginLeft: 10,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& > *': {
      marginBottom: 5
    }
  },
  flexDiv: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gridGap: 5
  },
  nameDiv: {
    width: '25%'
  },
  contentDiv: {
    width: '100%',
    display: 'grid',
    gridGap: 10,
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
  }
});

export function ListPatientHistoryByTypeComponent({ list, selected, defaultType, setModalVisible, selectMedicalForm }) {
  const classes = useStyles();

  const handleSelect = el => {
    selectMedicalForm(el);
  };

  const handleDetailMedicalForm = el => {
    setModalVisible(true, DETAILS_FORM_TEXT);
    handleSelect(el);
  };

  return (
    <List className={classes.root}>
      {list.length === 0 && <EmptyComponent />}
      {list
        .sort((a, b) =>
          compareStringTagName(
            testFormsNames.find(tf => tf.id === a.type),
            testFormsNames.find(tf => tf.id === b.type)
          )
        )
        .map(report => {
          return (
            <ListItem
              key={report.id}
              className={clsx(classes.itemList, selected && selected.id === report.id && classes.selectedItemList)}
              divider
              onClick={() => handleSelect(report)}
            >
              <div className={classes.rootDiv}>
                <div className={classes.iconTestContainer}>
                  <IconTestComponent type={getPropValue(report, 'type')} />
                </div>
                <div className={classes.itemContent}>
                  <div className={classes.flexDiv}>
                    {['recently', 'otherstest', '', undefined].includes(defaultType) ? (
                      <div>
                        <Typography variant="h6">
                          {getPropValue(report, 'type') === 'otherstest'
                            ? report.othersName
                            : getPropValue(
                                testFormsNames.find(tf => tf.id === getPropValue(report, 'type')),
                                'name'
                              ) || ''}
                        </Typography>
                      </div>
                    ) : null}
                    <div className={classes.contentDiv}>
                      <TypeMedicalFormComponent data={report} />
                    </div>
                  </div>
                  <div>
                    <Typography variant="body2">
                      <strong>{`Fecha: `}</strong>
                      {moment(moment.unix(report.clinicalDate).toDate()).format('DD/MM/YYYY')}
                      <strong>{` Hora: `}</strong>
                      {moment(moment.unix(report.clinicalDate).toDate()).format(' hh:mma')}
                    </Typography>
                  </div>
                </div>
              </div>
              <ListItemSecondaryAction>
                <StandardDetailButtonIcon onClick={() => handleDetailMedicalForm(report)} />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
    </List>
  );
}

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

  return (
    <>
      {loadingList ? (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      ) : (
        <>
          <ListPatientHistoryByTypeComponent
            list={historyList}
            setModalVisible={setModalVisible}
            defaultType={defaultType}
            selectMedicalForm={selectMedicalForm}
            selected={selected}
          />
          <PaginationComponent total={total} />
        </>
      )}
    </>
  );
}

export default memo(ListPatientHistoryComponent);
