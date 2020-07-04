import React from 'react';
import { LinearProgress, Grid, Box, Divider, makeStyles, Typography, Card } from '@material-ui/core';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer, CartesianGrid } from 'recharts';
import moment from 'moment';
import TitleAndIconComponent from '../TitleAndIconComponent';
import { ListPatientHistoryByTypeComponent } from './ListPatientHistoryComponentOLD';
import { PrincipalFieldsTests, severityConstant, testFormsNames } from '../../helpers/constants';
import { getPropValue, enumerateDaysBetweenDates } from '../../helpers/utils';

const useStyles = makeStyles(theme => ({
  boxRoot: {
    backgroundColor: '#f6f7f9'
  },
  paperRoot: {
    marginBottom: 10
  },
  gridRoot: {
    padding: 5
  },
  gridList: {
    maxHeight: 400,
    minHeight: '100%',
    overflowY: 'scroll'
  },
  gridGraphic: {
    minHeight: 400,
    maxHeight: 400,
    [theme.breakpoints.down(960)]: {
      borderBottom: '1px solid #ccc'
    },
    [theme.breakpoints.up(960)]: {
      borderRight: '1px solid #ccc'
    }
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
}));

function CustomizedLabel({ x, y, stroke, value }) {
  return (
    <text x={x} y={y - 5} dy={-4} fill={stroke} color={stroke} fontSize={12} textAnchor="middle">
      {value}
    </text>
  );
}

function CustomizedAxisTick({ x, y, payload }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} fontSize={10} textAnchor="end" fill="#666" transform="rotate(-35)">
        {payload.value}
      </text>
    </g>
  );
}

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
          <div
            key={index.toString()}
            style={{
              color: entry.color
            }}
          >
            <Typography>
              <span>{`${PrincipalFieldsTests[getPropValue(entry, 'dataKey')]}: `}</span>
              <strong>
                {getPropValue(entry, 'payload.type') === 'otherstest'
                  ? getPropValue(
                      severityConstant.find(sc => sc.id === getPropValue(entry, 'payload.severity')),
                      'name'
                    )
                  : getPropValue(entry, 'value')}
              </strong>
            </Typography>
            <Typography>
              Fecha: <strong>{moment.unix(getPropValue(entry, 'payload.clinicalDate')).format('DD/MM/YYYY')}</strong>
            </Typography>
            <Typography>
              Hora: <strong>{moment.unix(getPropValue(entry, 'payload.clinicalDate')).format('hh:mm a')}</strong>
            </Typography>
          </div>
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
  selected,
  rangeDate
}) {
  const classes = useStyles();

  const enumeratedDays = rangeDate
    ? enumerateDaysBetweenDates(moment.unix(rangeDate[0]), moment.unix(rangeDate[1]))
    : [];

  const aux1 = historyList.map(el => {
    const { type } = el;
    const list = enumeratedDays.map(day => {
      const current =
        historyList.find(
          item => moment(day).format('DD-MM-YYYY') === moment.unix(item.clinicalDate).format('DD-MM-YYYY')
        ) || {};
      const auxVal =
        Number(current.celsiusDegree) ||
        (type === 'heartrate' && Number(current.heartrate)) ||
        Number(current.weight) ||
        Number(current.INR) ||
        Number(current.sugarConcentration) ||
        Number(current.heartbeat) ||
        Number(current.breathingFrecuency) ||
        Number(current.steps) ||
        getPropValue(
          severityConstant.find(sc => sc.id === current.severity),
          'severityRank'
        ) ||
        (Number(current.diastolica) >= Number(current.sistolica)
          ? Number(current.diastolica)
          : Number(current.sistolica));

      return {
        ...current,
        ...(auxVal ? { dataMax: auxVal + 10 ** (auxVal.toString().split('.').length - 1) } : {}),
        date: moment(day).format('DD-MM-YYYY'),
        ...(current.diastolica ? { diastolica: Number(el.diastolica) } : {}),
        ...(current.sistolica ? { sistolica: Number(el.sistolica) } : {}),
        ...(current.heartrate ? { heartrate: Number(el.heartrate) } : {}),
        ...(current.weight ? { weight: auxVal } : {}),
        ...(current.celsiusDegree ? { celsiusDegree: auxVal } : {}),
        ...(current.INR ? { INR: auxVal } : {}),
        ...(current.sugarConcentration ? { sugarConcentration: auxVal } : {}),
        ...(current.heartbeat ? { heartbeat: auxVal } : {}),
        ...(current.breathingFrecuency ? { breathingFrecuency: auxVal } : {}),
        ...(current.steps ? { steps: auxVal } : {}),
        ...(current.severity
          ? {
              severityRank: auxVal
            }
          : {})
      };
    });
    return { type, list };
  });

  const uniqueResult = Array.from(new Set(aux1.map(a => a.type))).map(type => {
    return aux1.find(a => a.type === type);
  });

  if (loadingList) return <LinearProgress />;
  return (
    <Box padding={1} className={classes.boxRoot}>
      {uniqueResult.map((a, index) => (
        <Card key={`${a.type}_${index.toString()}`} elevation={10} variant="outlined" className={classes.paperRoot}>
          <Box margin={1}>
            <TitleAndIconComponent
              type={a.type}
              alternativeTitle={getPropValue(
                testFormsNames.find(tf => tf.id === a.type),
                'name'
              )}
            />
          </Box>
          <Divider />
          <Grid container>
            <Grid item xs={12} sm={12} md={6} className={classes.gridGraphic}>
              <ResponsiveContainer>
                <LineChart height={250} data={a.list} margin={{ bottom: 0, top: 10, right: 10, left: 10 }}>
                  <CartesianGrid strokeDasharray={`${enumeratedDays.length} ${enumeratedDays.length}`} />
                  <XAxis dataKey="date" padding={{ left: 30, right: 30 }} tick={<CustomizedAxisTick />} />
                  <YAxis dataKey="dataMax" domain={[0, 'dataMax']} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend content={<CustomLegendComponent />} />
                  {(a.type === 'pressure' && [
                    <Line
                      key="diastolica"
                      type="monotone"
                      dataKey="diastolica"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      label={<CustomizedLabel />}
                    />,
                    <Line
                      key="sistolica"
                      type="monotone"
                      dataKey="sistolica"
                      stroke="#82ca9d"
                      activeDot={{ r: 8 }}
                      label={<CustomizedLabel />}
                    />
                  ]) ||
                    (a.type === 'heartrate' && (
                      <Line
                        type="monotone"
                        dataKey="heartrate"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        label={<CustomizedLabel />}
                      />
                    )) ||
                    (a.type === 'temperature' && (
                      <Line
                        type="monotone"
                        dataKey="celsiusDegree"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        label={<CustomizedLabel />}
                      />
                    )) ||
                    (a.type === 'weight' && (
                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        label={<CustomizedLabel />}
                      />
                    )) ||
                    (a.type === 'glucose' && (
                      <Line
                        type="monotone"
                        dataKey="sugarConcentration"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        label={<CustomizedLabel />}
                      />
                    )) ||
                    (a.type === 'inr' && (
                      <Line
                        type="monotone"
                        dataKey="INR"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        label={<CustomizedLabel />}
                      />
                    )) ||
                    (a.type === 'breathing' && (
                      <Line
                        type="monotone"
                        dataKey="breathingFrecuency"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        label={<CustomizedLabel />}
                      />
                    )) ||
                    (a.type === 'oxygen' && (
                      <Line
                        type="monotone"
                        dataKey="heartbeat"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        label={<CustomizedLabel />}
                      />
                    )) ||
                    (a.type === 'exercises' && (
                      <Line
                        type="monotone"
                        dataKey="steps"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        label={<CustomizedLabel />}
                      />
                    )) ||
                    (a.type === 'otherstest' && (
                      <Line
                        type="monotone"
                        dataKey="severityRank"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        label={<CustomizedLabel />}
                      />
                    ))}
                </LineChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className={classes.gridList}>
              <ListPatientHistoryByTypeComponent
                list={a.list.filter(item => item.type)}
                defaultType={a.type}
                selectMedicalForm={selectMedicalForm}
                selected={selected}
                setModalVisible={setModalVisible}
              />
            </Grid>
          </Grid>
        </Card>
      ))}
    </Box>
  );
}

export default ListPatientHistoryGraphicComponent;
