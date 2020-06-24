import React from 'react';
import { LinearProgress, Grid, Paper, Box, Divider, makeStyles, Typography } from '@material-ui/core';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer, CartesianGrid } from 'recharts';
import moment from 'moment';
import TitleAndIconComponent from '../TitleAndIconComponent';
import { ListPatientHistoryByTypeComponent } from './ListPatientHistoryComponent';
import { PrincipalFieldsTests } from '../../helpers/constants';

const useStyles = makeStyles({
  paperRoot: {
    marginBottom: 20
  },
  gridRoot: {
    padding: 5
  },
  gridList: {
    minHeight: 400,
    maxHeight: 400,
    overflowY: 'scroll'
  },
  gridGraphic: {
    minHeight: 400,
    maxHeight: 400,
    backgroundColor: '#f6f7f9',
    color: 'transparent',
    boxShadow: 'inset 0px 1px 3px rgba(0,0,0,0.5)',
    backgroundClip: 'text'
  },
  customTooltip: {
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderRadius: 3,
    border: '1px solid #ccc',
    height: 'auto',
    width: 'auto',
    color: '#000000',
    padding: 5
  },
  legendText: {
    color: '#000',
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginRight: 10
    }
  }
});

const CustomLegendComponent = props => {
  const { payload } = props;
  const classes = useStyles();

  return (
    <ul className={classes.legendText}>
      {payload.map((entry, index) => (
        <li key={`item-${index.toString()}`} style={{ color: entry.color }}>
          {PrincipalFieldsTests[entry.value]}
        </li>
      ))}
    </ul>
  );
};

const CustomTooltip = ({ active, payload }) => {
  const classes = useStyles();

  if (active) {
    return (
      <div className={classes.customTooltip}>
        {payload.map((entry, index) => (
          <Typography key={index.toString()}>
            <span>{`${PrincipalFieldsTests[entry.dataKey]}: `}</span>
            <strong>{entry.value}</strong>
          </Typography>
        ))}
      </div>
    );
  }

  return null;
};

function ListPatientHistoryGraphicComponent({
  loadingList,
  historyList,
  setModalVisible,
  selectMedicalForm,
  selected
}) {
  const classes = useStyles();

  const formatA = historyList.map(el => {
    return {
      ...el,
      date: moment.unix(el.clinicalDate).format('DD-MM-YYYY'),
      ...(el.diastolica ? { diastolica: parseInt(el.diastolica, 10) } : {}),
      ...(el.sistolica ? { sistolica: parseInt(el.sistolica, 10) } : {}),
      ...(el.heartrate ? { heartrate: parseInt(el.heartrate, 10) } : {}),
      ...(el.weight ? { weight: parseInt(el.weight, 10) } : {}),
      ...(el.celsiusDegree ? { celsiusDegree: parseInt(el.celsiusDegree, 10) } : {}),
      ...(el.INR ? { INR: parseInt(el.INR, 10) } : {}),
      ...(el.sugarConcentration ? { sugarConcentration: parseInt(el.sugarConcentration, 10) } : {}),
      ...(el.heartbeat ? { heartbeat: parseInt(el.heartbeat, 10) } : {}),
      ...(el.breathingFrecuency ? { breathingFrecuency: parseInt(el.breathingFrecuency, 10) } : {}),
      ...(el.steps ? { steps: parseInt(el.steps, 10) } : {}),
      ...(el.gravity ? { gravity: parseInt(el.gravity, 10) } : {})
    };
  });

  const groupTypeTest = formatA.map(ht => ({
    type: ht.type,
    list: formatA.filter(fht => ht.type === fht.type)
  }));

  const uniqueResult = Array.from(new Set(groupTypeTest.map(a => a.type))).map(type => {
    return groupTypeTest.find(a => a.type === type);
  });

  if (loadingList) return <LinearProgress />;
  return (
    <div>
      {uniqueResult.map(a => (
        <Paper key={a.type} variant="outlined" square className={classes.paperRoot}>
          <Box margin={1}>
            <TitleAndIconComponent type={a.type} />
          </Box>
          <Divider />
          <Grid container className={classes.gridRoot}>
            <Grid item xs={12} sm={12} md={5} className={classes.gridList}>
              <ListPatientHistoryByTypeComponent
                list={a.list}
                defaultType={a.type}
                selectMedicalForm={selectMedicalForm}
                selected={selected}
                setModalVisible={setModalVisible}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={7} className={classes.gridGraphic}>
              <ResponsiveContainer>
                <LineChart height={250} data={a.list}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend content={<CustomLegendComponent />} />
                  {(a.type === 'pressure' && [
                    <Line
                      key="diastolica"
                      type="monotone"
                      dataKey="diastolica"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />,
                    <Line key="sistolica" type="monotone" dataKey="sistolica" stroke="#82ca9d" activeDot={{ r: 8 }} />
                  ]) ||
                    (a.type === 'heartrate' && (
                      <Line type="monotone" dataKey="heartrate" stroke="#8884d8" activeDot={{ r: 8 }} />
                    )) ||
                    (a.type === 'temperature' && (
                      <Line type="monotone" dataKey="celsiusDegree" stroke="#8884d8" activeDot={{ r: 8 }} />
                    )) ||
                    (a.type === 'weight' && <Line type="monotone" dataKey="weight" stroke="#8884d8" />) ||
                    (a.type === 'glucose' && (
                      <Line type="monotone" dataKey="sugarConcentration" stroke="#8884d8" activeDot={{ r: 8 }} />
                    )) ||
                    (a.type === 'inr' && <Line type="monotone" dataKey="INR" stroke="#8884d8" />) ||
                    (a.type === 'breathing' && (
                      <Line type="monotone" dataKey="breathingFrecuency" stroke="#8884d8" activeDot={{ r: 8 }} />
                    )) ||
                    (a.type === 'oxygen' && (
                      <Line type="monotone" dataKey="heartbeat" stroke="#8884d8" activeDot={{ r: 8 }} />
                    )) ||
                    (a.type === 'exercises' && (
                      <Line type="monotone" dataKey="steps" stroke="#8884d8" activeDot={{ r: 8 }} />
                    )) ||
                    (a.type === 'others' && (
                      <Line type="monotone" dataKey="gravity" stroke="#8884d8" activeDot={{ r: 8 }} />
                    ))}
                </LineChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
}

export default ListPatientHistoryGraphicComponent;
