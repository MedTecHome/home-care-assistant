import React from 'react';
import { LinearProgress, Grid, Box, Divider, makeStyles, Typography, Card } from '@material-ui/core';
import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';
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

  const aux1 = historyList
    .sort((a, b) => a.clinicalDate - b.clinicalDate)
    .map(el => {
      const { type, clinicalDate } = el;
      const auxVal =
        Number(el.celsiusDegree) ||
        (type === 'heartrate' && Number(el.heartrate)) ||
        Number(el.weight) ||
        Number(el.INR) ||
        Number(el.sugarConcentration) ||
        Number(el.heartbeat) ||
        Number(el.breathingFrecuency) ||
        Number(el.steps) ||
        getPropValue(
          severityConstant.find(sc => sc.id === el.severity),
          'severityRank'
        ) ||
        (Number(el.diastolica) >= Number(el.sistolica) ? Number(el.diastolica) : Number(el.sistolica));

      return {
        ...el,
        ...(auxVal ? { dataMax: auxVal + 10 ** (auxVal.toString().split('.')[0].toString().length - 1) } : {}),
        date: moment.unix(clinicalDate).format('DD-MM-YYYY'),
        ...(el.diastolica ? { diastolica: Number(el.diastolica) } : {}),
        ...(el.sistolica ? { sistolica: Number(el.sistolica) } : {}),
        ...(el.heartrate ? { heartrate: Number(el.heartrate) } : {}),
        ...(el.weight ? { weight: auxVal } : {}),
        ...(el.celsiusDegree ? { celsiusDegree: auxVal } : {}),
        ...(el.INR ? { INR: auxVal } : {}),
        ...(el.sugarConcentration ? { sugarConcentration: auxVal } : {}),
        ...(el.heartbeat ? { heartbeat: auxVal } : {}),
        ...(el.breathingFrecuency ? { breathingFrecuency: auxVal } : {}),
        ...(el.steps ? { steps: auxVal } : {}),
        ...(el.severity
          ? {
              severityRank: auxVal
            }
          : {})
      };
    });

  const aux2 = aux1.map(item => ({ type: item.type, list: aux1.filter(el => el.type === item.type) }));

  const uniqueResult = Array.from(new Set(aux2.map(a => a.type))).map(type => {
    return aux2.find(a => a.type === type);
  });

  if (loadingList) return <LinearProgress />;
  return (
    <Box padding={1} className={classes.boxRoot}>
      {uniqueResult
        .filter(item => item.list.some(exist => exist.type))
        .map((a, index) => (
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
                  <AreaChart height={250} data={a.list} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorOne" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorTwo" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray={`${enumeratedDays.length} ${enumeratedDays.length}`} />
                    <XAxis dataKey="date" padding={{ left: 30, right: 30 }} tick={<CustomizedAxisTick />} />
                    <YAxis dataKey="dataMax" domain={[0, 'dataMax']} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={<CustomLegendComponent />} />
                    {(a.type === 'pressure' && [
                      <Area
                        key="diastolica"
                        type="monotone"
                        dataKey="diastolica"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        label={<CustomizedLabel />}
                        fillOpacity={1}
                        fill="url(#colorOne)"
                      />,
                      <Area
                        key="sistolica"
                        type="monotone"
                        dataKey="sistolica"
                        stroke="#82ca9d"
                        activeDot={{ r: 8 }}
                        label={<CustomizedLabel />}
                        fillOpacity={1}
                        fill="url(#colorTwo)"
                      />
                    ]) ||
                      (a.type === 'heartrate' && (
                        <Area
                          type="monotone"
                          dataKey="heartrate"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                          label={<CustomizedLabel />}
                          fillOpacity={1}
                          fill="url(#colorOne)"
                        />
                      )) ||
                      (a.type === 'temperature' && (
                        <Area
                          type="monotone"
                          dataKey="celsiusDegree"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                          label={<CustomizedLabel />}
                          fillOpacity={1}
                          fill="url(#colorOne)"
                        />
                      )) ||
                      (a.type === 'weight' && (
                        <Area
                          type="monotone"
                          dataKey="weight"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                          label={<CustomizedLabel />}
                          fillOpacity={1}
                          fill="url(#colorOne)"
                        />
                      )) ||
                      (a.type === 'glucose' && (
                        <Area
                          type="monotone"
                          dataKey="sugarConcentration"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                          label={<CustomizedLabel />}
                          fillOpacity={1}
                          fill="url(#colorOne)"
                        />
                      )) ||
                      (a.type === 'inr' && (
                        <Area
                          type="monotone"
                          dataKey="INR"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                          label={<CustomizedLabel />}
                          fillOpacity={1}
                          fill="url(#colorOne)"
                        />
                      )) ||
                      (a.type === 'breathing' && (
                        <Area
                          type="monotone"
                          dataKey="breathingFrecuency"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                          label={<CustomizedLabel />}
                          fillOpacity={1}
                          fill="url(#colorOne)"
                        />
                      )) ||
                      (a.type === 'oxygen' && (
                        <Area
                          type="monotone"
                          dataKey="heartbeat"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                          label={<CustomizedLabel />}
                          fillOpacity={1}
                          fill="url(#colorOne)"
                        />
                      )) ||
                      (a.type === 'exercises' && (
                        <Area
                          type="monotone"
                          dataKey="steps"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                          label={<CustomizedLabel />}
                          fillOpacity={1}
                          fill="url(#colorOne)"
                        />
                      )) ||
                      (a.type === 'otherstest' && (
                        <Area
                          type="monotone"
                          dataKey="severityRank"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                          label={<CustomizedLabel />}
                          fillOpacity={1}
                          fill="url(#colorOne)"
                        />
                      ))}
                  </AreaChart>
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
