import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { useFormContext } from 'react-hook-form';
import { EDIT_FORM_TEXT, REQUIRED_FIELD } from '../../../commons/globalText';

export default function GenericPatientForm({ classes, formType, birthday, setBirthday }) {
  const { register, errors } = useFormContext();
  return (
    <>
      {formType === EDIT_FORM_TEXT && <input type="hidden" ref={register} name="id" />}
      <Grid item xs={12} sm={12} md={12}>
        <FormControl className={classes.formControl} error={!!errors.name}>
          <TextField
            InputLabelProps={{ shrink: true }}
            size="small"
            inputRef={register({
              required: REQUIRED_FIELD,
            })}
            error={!!errors.name}
            label="Nombre:"
            helperText={errors.name ? errors.name.message : ''}
            variant="outlined"
            name="name"
            value={undefined}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <FormControl size="small" className={classes.formControl} error={!!errors.lastName}>
          <TextField
            size="small"
            InputLabelProps={{ shrink: true }}
            inputRef={register({
              required: REQUIRED_FIELD,
            })}
            error={!!errors.lastName}
            label="Apellidos:"
            helperText={errors.lastName ? errors.lastName.message : ''}
            variant="outlined"
            name="lastName"
          />
        </FormControl>
      </Grid>
      <Grid item xs={8} sm={8} md={8}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <FormControl className={classes.formControl} error={!!errors.birthday}>
            <DatePicker
              error={!!errors.birthday}
              label="Fecha de nacimiento"
              size="small"
              variant="inline"
              value={birthday}
              autoOk
              onChange={setBirthday}
              animateYearScrolling
              format="DD/MM/YYYY"
              inputVariant="outlined"
              name="birthday"
              helperText={errors.birthday ? errors.birthday.message : ''}
            />
          </FormControl>
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={4} sm={4} md={4}>
        <FormControl className={classes.formControl} error={!!errors.height}>
          <TextField
            InputLabelProps={{ shrink: true }}
            size="small"
            type="number"
            inputRef={register({
              required: REQUIRED_FIELD,
            })}
            error={!!errors.height}
            label="Estatura:"
            helperText={errors.height ? errors.height.message : ''}
            variant="outlined"
            name="height"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl className={classes.formControl} error={!!errors.address}>
          <TextField
            InputLabelProps={{ shrink: true }}
            size="small"
            inputRef={register({
              required: REQUIRED_FIELD,
            })}
            error={!!errors.address}
            label="Direccion:"
            helperText={errors.address ? errors.address.message : ''}
            variant="outlined"
            name="address"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl className={classes.formControl} error={!!errors.phone}>
          <TextField
            InputLabelProps={{ shrink: true }}
            size="small"
            type="number"
            inputRef={register({
              required: REQUIRED_FIELD,
            })}
            error={!!errors.phone}
            label="Telefono:"
            helperText={errors.phone ? errors.phone.message : ''}
            variant="outlined"
            name="phone"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl className={classes.formControl} error={!!errors.userId}>
          <TextField
            InputLabelProps={{ shrink: true }}
            size="small"
            inputRef={register({
              required: REQUIRED_FIELD,
            })}
            error={!!errors.userId}
            label="Usuario:"
            helperText={errors.userId ? errors.userId.message : ''}
            variant="outlined"
            name="userId"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl className={classes.formControl} error={!!errors.doctorId}>
          <TextField
            InputLabelProps={{ shrink: true }}
            size="small"
            inputRef={register({
              required: REQUIRED_FIELD,
            })}
            error={!!errors.doctorId}
            label="Doctor:"
            helperText={errors.doctorId ? errors.doctorId.message : ''}
            variant="outlined"
            name="doctorId"
          />
        </FormControl>
      </Grid>
    </>
  );
}
