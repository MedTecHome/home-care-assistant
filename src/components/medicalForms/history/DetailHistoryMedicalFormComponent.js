import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import DetailTextComponent from '../../DetailTextComponent';
import { getPropValue } from '../../../helpers/utils';
import { DialogTitleComponent } from '../../ModalComponent';
import { usePatientHistoryContext } from './PatientHistoryContext';

const useStyles = makeStyles({
  textStyle: {
    '&>*': {
      fontSize: 12,
      lineHeight: '200%',
      fontWeight: 400,
      color: '#000'
    }
  }
});

function DetailHistoryMedicalFormComponent() {
  const { selected, setModalVisible } = usePatientHistoryContext();
  const classes = useStyles();

  const handleClose = () => {
    setModalVisible(false, null);
  };

  return (
    <>
      <DialogTitleComponent onClose={handleClose}>
        {selected && selected.type && selected.type.name}
      </DialogTitleComponent>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography>
                      Paciente: <strong>{getPropValue(selected, 'user.fullname') || '?'}</strong>
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} className={classes.textStyle} spacing={1} container justify="center">
            {selected.type.id === 'pressure' && (
              <>
                <DetailTextComponent label="Diastolica" value={getPropValue(selected, 'diastolica') || '?'} />
                <DetailTextComponent label="Sistolica" value={getPropValue(selected, 'sistolica') || '?'} />
                <DetailTextComponent label="Frecuencia Cardiaca" value={getPropValue(selected, 'heartrate') || '?'} />
              </>
            )}
            {selected.type.id === 'temperature' && (
              <>
                <DetailTextComponent label="Gados" value={getPropValue(selected, 'celsiusDegree') || '?'} />
              </>
            )}
            {selected.type.id === 'weight' && (
              <>
                <DetailTextComponent label="Peso" value={getPropValue(selected, 'weight') || '?'} />
              </>
            )}
            {selected.type.id === 'glucose' && (
              <>
                <DetailTextComponent
                  label="Concentración de azucar"
                  value={getPropValue(selected, 'sugarConcentration') || '?'}
                />
                <DetailTextComponent label="Horario" value={getPropValue(selected, 'shedule.name') || '?'} />
                <DetailTextComponent label="Momento de ingesta" value={getPropValue(selected, 'intakeTime') || '?'} />
                <DetailTextComponent label=" Unidad glucosa" value={getPropValue(selected, 'glucoseUnity') || '?'} />
                <DetailTextComponent label=" Insulina comida" value={getPropValue(selected, 'hba1c') || '?'} />
                <DetailTextComponent label="HbA1c" value={getPropValue(selected, 'insulinaFood') || '?'} />
                <DetailTextComponent label="Basal" value={getPropValue(selected, 'basal') || '?'} />
                <DetailTextComponent label=" Unidad de pan" value={getPropValue(selected, 'breadUnity') || '?'} />
              </>
            )}
            {selected.type.id === 'breathing' && (
              <>
                <DetailTextComponent label=" EtCO" value={getPropValue(selected, 'EtCO') || '?'} />
                <DetailTextComponent label=" PI" value={getPropValue(selected, 'breathingPI') || '?'} />
                <DetailTextComponent
                  label=" Frecuencia Respiratoria"
                  value={getPropValue(selected, 'breathingFrecuency') || '?'}
                />
              </>
            )}
            {selected.type.id === 'inr' && (
              <>
                <DetailTextComponent label=" INR" value={getPropValue(selected, 'INR') || '?'} />
              </>
            )}
            {selected.type.id === 'oxygen' && (
              <>
                <DetailTextComponent label=" Pulso" value={getPropValue(selected, 'heartbeat') || '?'} />
                <DetailTextComponent label=" SpO2" value={getPropValue(selected, 'SpO2') || '?'} />
                <DetailTextComponent label=" PI" value={getPropValue(selected, 'oxygenPI') || '?'} />
              </>
            )}
            {selected.type.id === 'exercises' && (
              <>
                <DetailTextComponent label=" Distancia" value={getPropValue(selected, 'distance') || '?'} />
                <DetailTextComponent label=" Tiempo" value={getPropValue(selected, 'time') || '?'} />
                <DetailTextComponent label="  Cantidad de pasos" value={getPropValue(selected, 'steps') || '?'} />
              </>
            )}
            <DetailTextComponent
              label="Fecha"
              value={selected && moment(selected.date.toDate()).format('DD/MM/YYYY hh:mma')}
            />
            <DetailTextComponent label="Nota" value={getPropValue(selected, 'note') || '?'} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button size="small" disableElevation color="primary" variant="contained" onClick={handleClose}>
          Aceptar
        </Button>
      </DialogActions>
    </>
  );
}

export default DetailHistoryMedicalFormComponent;
